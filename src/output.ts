import { IOutputEditor } from '.';

export class OutputEditor implements IOutputEditor {
  private _output: {
    others: string[];
    options: { [key: string]: any };
  };

  constructor() {
    this._output = {
      others: [],
      options: {},
    };
  }

  output() {
    return this._output;
  }

  addNormalArg(arg: string) {
    this._output.others.push(arg);
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
