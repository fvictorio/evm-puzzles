async function setup(puzzleCode, data) {
  const [s] = await ethers.getSigners();

  const address = "0xffffffffffffffffffffffffffffffffffffffff";

  await hre.network.provider.send("hardhat_setCode", [address, `0x${puzzleCode}`]);

  data = data.startsWith("0x") ? data : `0x${data}`

  try {
    await s.sendTransaction({
      to: address,
      data,
      gasLimit: 1_000_000,
    });

    console.log('Puzzle solved!');
  } catch (e) {
    console.error('Wrong solution')
    process.exit(1);
  }
}

module.exports = { setup };
