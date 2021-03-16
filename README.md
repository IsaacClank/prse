# PRSE

---

prse is a minimal cli parsing library for Node.js

## I. Usage

```Javascript
const args = process.argv.slice(2);
const format = {
  parameters: ['-a', '--all'],
  flags: ['-P', '-S']
}

const parser = initParser(format); 
const parsedOutput = parser.parse(args);

console.log(parsedOutput);
```

## II. API Overview

### 1. Parser

Fields:

* __args__: array of string arguments to be parsed.
* __outputEditor__: a helper object for parser, has methods for modifying a type of output for parser.
* __validator__: an object that has many validating methods.

Methods:

* __parse(args:string[]):any__: takes a string of arguments and return the parsed output.

### 2. BaseValidator

Fields:

* __format__: defines what arguments are validated against.

Methods:

* __isOption(arg: string)__: boolean
* __isGroup(arg: string)__: boolean
* __isValueOfOption(arg: string, args__: string[])
* __isValidParameter(arg: string)__: boolean
* __isValidFlag(arg: string)__: boolean

### 3. BaseOutputEditor

Fields:

* ___output__: the parsed output.

Methods:

* __output()__: return the parsed output.
* __addNormalArgs()__: define how to add normal arguments to _output.
* __addOption()__: define how to add option arguments to _output.

### 4. Interface

* Validator
* OutputEditor
* Output: the type returned by OutputEditor.output()
