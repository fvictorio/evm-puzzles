# EVM puzzles

A collection of EVM puzzles. Each puzzle consists on sending a successful transaction to a contract. The bytecode of the contract is provided, and you need to fill the transaction data that won't revert the execution.

## How to play

Clone this repository and install its dependencies (`npm install` or `yarn`), open `puzzles/puzzle_1.js`, and fill the values of the solution. In the first puzzles you'll only need to fill the `data` variable, but later you might need to change the `value` too.

After filling the solution, check if it's valid by running `npx hardhat run puzzles/puzzle_1.js`. You'll get a message saying if the puzzle was solved or not. That's it. And if you solve it, continue with the next ones :)

You can use [`evm.codes`](https://www.evm.codes/)'s reference and playground to work through this.
