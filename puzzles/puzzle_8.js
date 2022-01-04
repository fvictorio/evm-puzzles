const { setup } = require("./setup");

const puzzleCode = [
  '38',     // CODESIZE
  '34',     // CALLVALUE
  '90',     // SWAP1
  '11',     // GT
  '6008',   // PUSH1 08
  '57',     // JUMPI
  'fd',     // REVERT
  '5b',     // JUMPDEST
  '36',     // CALLDATASIZE
  '610003', // PUSH2 03
  '90',     // SWAP1
  '06',     // MOD
  '15',     // ISZERO
  '34',     // CALLVALUE
  '600a',   // PUSH1 0a
  '01',     // ADD
  '57',     // JUMPI
  'fdfd',   // REVERT REVERT
  'fdfd',   // REVERT REVERT
  '5b',     // JUMPDEST
].join('')

// Enter your solution here
const value = 0
const data = ""

setup(puzzleCode, data, value)
