export * from './output';
export * from './parser';
export * from './type';
export * from './validator';

import { ParseSyntax, OutputEditor, Parser, Validator } from '.';

export const initParser = (format: ParseSyntax) => {
  const validator = new Validator(format);
  const outputEditor = new OutputEditor();
  return new Parser(validator, outputEditor);
};
