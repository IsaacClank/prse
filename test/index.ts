import { assertEq, Tester } from 'prve';
import { Format, initParser, Output } from '../src';

const tester = new Tester('prse');

const format: Format = {
  flags: ['-S'],
  parameters: ['-b', '--body', '-m', '--method'],
};
const args = ['localhost:3001', '-Sm', 'POST'];

tester.add(function testInitParser() {
  const parser = initParser(format);

  const output = parser.parse(args);
  const expected: Output = {
    nonOptions: ['localhost:3001'],
    options: {
      '-S': true,
      '-m': 'POST',
    },
  };

  return assertEq(expected, output);
});

tester.execute();
