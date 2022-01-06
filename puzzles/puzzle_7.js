const { setup } = require("./setup");

const puzzleCode = [
  '36',     // CALLDATASIZE
  '6003',   // PUSH1 03
  '10',     // LT
  '6009',   // PUSH1 0d
  '57',     // JUMPI
  'fdfd',   // REVERT REVERT
  '5b',     // JUMPDEST
  '34',     // CALLVALUE
  '36',     // CALLDATASIZE
  '02',     // MUL
  '6008',   // PUSH1 08
  '14',     // EQ
  '6014',   // PUSH1 0d
  '57',     // JUMPI
  'fd',     // REVERT
  '5b',     // JUMPDEST
].join('')

// Enter your solution here
const solution = {
  data: "0x",
  value: 0
}

setup(puzzleCode, solution)
