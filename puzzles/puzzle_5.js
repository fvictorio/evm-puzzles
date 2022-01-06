const { setup } = require("./setup");

const puzzleCode = [
  '34',     // CALLVALUE
  '610004', // PUSH2 0004
  '01',     // ADD
  '56',     // JUMP
  'fdfd',   // REVERT REVERT
  'fdfd',   // REVERT REVERT
  '5b',     // JUMPDEST
].join('')

// Enter your solution here
const solution = {
  data: "0x",
  value: 0
}

setup(puzzleCode, solution)
