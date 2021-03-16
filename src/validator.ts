export interface Format {
  parameters: string[];
  flags: string[];
}

export interface Validator {
  isOption(arg: string): boolean;
  isGroup(arg: string): boolean;
  isValueOfOption(arg: string, args: string[]): boolean;
  isValidParameter(arg: string): boolean;
  isValidFlag(arg: string): boolean;
}

export class BaseValidator implements Validator {
  constructor(private format: Format) {}

  isOption(arg: string): boolean {
    const optionSyntaxRe = /^-{1,2}\w+/;
    return optionSyntaxRe.test(arg);
  }

  isGroup(arg: string): boolean {
    return this.isOption(arg) && !(this.isValidParameter(arg) || this.isValidFlag(arg));
  }

  isValueOfOption(arg: string, args: string[]) {
    const index = args.indexOf(arg);
    const prevArg = args[index - 1];

    return index !== 0 && this.isValidParameter(prevArg);
  }

  isValidParameter(arg: string): boolean {
    return this.format.parameters.includes(arg);
  }

  isValidFlag(arg: string): boolean {
    return this.format.flags.includes(arg);
  }
}
