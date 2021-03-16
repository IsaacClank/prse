import { IOutputEditor, IValidator } from '.';

export class Parser {
  private args: string[];
  private outputEditor: IOutputEditor;
  private validator: IValidator;

  constructor(validator: IValidator, outputEditor: IOutputEditor) {
    this.args = [];
    this.outputEditor = outputEditor;
    this.validator = validator;
  }

  parse(args: string[]) {
    this.args = this.ungroup(args);
    this.args.forEach(arg => this.parseArg(arg));

    return this.outputEditor.output();
  }

  private ungroup(args: string[]) {
    return args.flatMap(arg =>
      this.validator.isGroup(arg)
        ? arg
            .slice(1)
            .split('')
            .map(sa => '-' + sa)
        : [arg]
    );
  }

  private parseArg(arg: string) {
    if (this.validator.isOption(arg)) this.parseOption(arg);
    else this.parseNonOptionArg(arg);
  }

  private parseOption(arg: string) {
    if (this.validator.isValidParameter(arg)) return this.parseParam(arg);
    if (this.validator.isValidFlag(arg)) return this.parseFlag(arg);
    throw Error(`Invalid option '${arg}'`);
  }

  private parseParam(key: string) {
    const keyIndex = this.args.indexOf(key);
    const value = this.args[keyIndex + 1];
    this.outputEditor.addOption(key, value);
  }

  private parseFlag(key: string) {
    this.outputEditor.addOption(key, true);
  }

  private parseNonOptionArg(arg: string) {
    if (this.validator.isValueOfOption(arg, this.args)) return;
    this.outputEditor.addNormalArg(arg);
  }
}
