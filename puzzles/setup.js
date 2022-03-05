async function setup(puzzleCode, { data, value }) {
  const [s] = await ethers.getSigners();

  const address = "0xffffffffffffffffffffffffffffffffffffffff";

  await hre.network.provider.send("hardhat_setCode", [
    address,
    `0x${puzzleCode}`
  ]);

  data = data.startsWith("0x") ? data : `0x${data}`;

  const evmCodesUrlData = data === "0x" ? "" : data;
  const evmCodesUrl = `https://www.evm.codes/playground?callValue=${value}&unit=Wei&callData=${evmCodesUrlData}&codeType=Bytecode&code='${puzzleCode}'_`;

  let failed = false;
  try {
    await s.sendTransaction({
      to: address,
      data,
      gasLimit: 1_000_000,
      value
    });

    console.log("Puzzle solved!");
  } catch (e) {
    console.error("Wrong solution :(");
    failed = true;
  }

  console.log();
  console.log("Run it in evm.codes:", evmCodesUrl);

  if (failed) {
    process.exit(1);
  }
}

module.exports = { setup };
