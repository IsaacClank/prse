export interface OutputEditor {
  addOption(key: string, value: any): void;
  addNormalArg(arg: string): void;
  output(): Output;
}

export interface Output {
  nonOptions: string[];
  options: {
    [key: string]: any;
  };
}

export class BaseOutputEditor implements OutputEditor {
  private _output: Output;
  constructor() {
    this._output = {
      nonOptions: [],
      options: {},
    };
  }

  output() {
    return this._output;
  }

  addNormalArg(arg: string) {
    this._output.nonOptions.push(arg);
  }

  addOption(key: string, value: any) {
    this.throwIfDupplicate(key);
    this._output.options[`${key}`] = value;
  }

  private throwIfDupplicate(key: string) {
    if (this.optionIsSet(key)) throw Error(`Dupplicate value for '${key}'`);
  }

  private optionIsSet(key: string) {
    return this._output.options[`${key}`] != null;
  }
}
