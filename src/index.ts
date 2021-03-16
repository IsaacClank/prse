import { BaseOutputEditor, BaseValidator, Format, Parser } from '.';

export * from './output';
export * from './parser';
export * from './validator';

export const initParser = (format: Format) => {
  const validator = new BaseValidator(format);
  const outputEditor = new BaseOutputEditor();
  return new Parser(validator, outputEditor);
};
