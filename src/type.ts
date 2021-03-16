export interface ParseSyntax {
  parameters: string[];
  flags: string[];
}

export interface IValidator {
  isOption(arg: string): boolean;
  isGroup(arg: string): boolean;
  isValueOfOption(arg: string, args: string[]): boolean;
  isValidParameter(arg: string): boolean;
  isValidFlag(arg: string): boolean;
}

export interface IOutputEditor {
  addOption(key: string, value: any): void;
  addNormalArg(arg: string): void;
  output(): any;
}
