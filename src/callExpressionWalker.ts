import * as Lint from "tslint";
import {IOptions} from "tslint";
import * as ts from "typescript";

export class CallExpressionWalker extends Lint.RuleWalker {
  constructor(sourceFile: ts.SourceFile, options: IOptions, private regex: RegExp, private failureString: string) {
    super(sourceFile, options);
  }

  public visitCallExpression(node: ts.CallExpression) {
    const match = node.expression.getText().match(this.regex);

    if (match) {
      const fix = Lint.Replacement.deleteText(node.getStart(), 1);
      this.addFailureAt(node.getStart(), match[0].length, this.failureString, fix);
    }

    super.visitCallExpression(node);
  }
}
