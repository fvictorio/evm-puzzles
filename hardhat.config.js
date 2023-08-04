require("@nomiclabs/hardhat-ethers")

const { play } = require("./src/play");

task("play")
  .setAction(play);

module.exports = {
  solidity: "0.8.20",
};
