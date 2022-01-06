const { setup } = require("./setup");

const puzzleCode = [
  '6000', // PUSH1 00
  '35',   // CALLDATALOAD
  '56',   // JUMP
  'fdfd', // REVERT REVERT
  'fdfd', // REVERT REVERT
  'fdfd', // REVERT REVERT
  '5b',   // JUMPDEST
].join('')

// Enter your solution here
const solution = {
  data: "0x",
  value: 0
}

setup(puzzleCode, solution)
