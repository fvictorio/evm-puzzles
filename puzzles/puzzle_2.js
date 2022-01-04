const { setup } = require("./setup");

const puzzleCode = [
  '36',   // CALLDATASIZE
  '38',   // CODESIZE
  '03',   // SUB
  '56',   // JUMP
  'fdfd', // REVERT REVERT
  'fdfd', // REVERT REVERT
  '5b',   // JUMPDEST
].join('')

const value = 0

// Enter your solution here
const data = ""

setup(puzzleCode, data, value)
