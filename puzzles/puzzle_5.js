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

const data = "0x"

// Enter your solution here
const value = 0

setup(puzzleCode, data, value)
