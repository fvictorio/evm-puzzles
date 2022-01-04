const { setup } = require("./setup");

const puzzleCode = [
  '34',     // CALLVALUE
  '80',     // DUP1
  '02',     // MUL
  '6009',   // PUSH1 09
  '14',     // EQ
  '600d',   // PUSH1 0d
  '57',     // JUMPI
  'fdfd',   // REVERT REVERT
  'fdfd',   // REVERT REVERT
  '5b',     // JUMPDEST
].join('')

const data = "0x"

// Enter your solution here
const value = 0

setup(puzzleCode, data, value)
