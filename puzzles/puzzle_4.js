const { setup } = require("./setup");

const puzzleCode = [
  '6000', // PUSH1 00
  '35',   // CALLDATALOAD
  '38',   // CODESIZE
  '18',   // XOR
  '56',   // JUMP
  'fdfd', // REVERT REVERT
  'fdfd', // REVERT REVERT
  'fdfd', // REVERT REVERT
  '5b',   // JUMPDEST
].join('')

const value = 0

// Enter your solution here
const data = ""

setup(puzzleCode, data, value)
