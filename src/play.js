const fs = require("fs-extra");
const { resolve } = require("path");
const inquirer = require("inquirer");
const chalk = require("chalk");

const { getOpcode } = require("./opcodes");

module.exports.play = async function play() {
  while (true) {
    const puzzle = getNextPuzzle();

    if (puzzle === undefined) {
      console.log("All puzzles are solved!");
      process.exit(0);
    }

    const solution = await playPuzzle(puzzle);

    if (solution) {
      saveSolution(puzzle.number, solution);

      if (await askPlayNext()) {
      } else {
        console.log("Thanks for playing!");
        process.exit(0);
      }
    } else {
      if (!(await askTryAgain())) {
        console.log("Thanks for playing!");
        process.exit(0);
      }
    }
  }
};

async function playPuzzle(puzzle) {
  printTitle(puzzle.number);
  console.log();
  printCode(puzzle.code);
  console.log();

  const solution = await readSolution(puzzle.askForData, puzzle.askForValue);

  const [success, evmCodesUrl] = await runPuzzle(puzzle.code, solution);

  console.log();
  if (success) {
    console.log(chalk.green("Puzzle solved!"));
  } else {
    console.error(chalk.red("Wrong solution :("));
  }
  console.log();
  console.log("Run it in evm.codes:", evmCodesUrl);
  console.log();

  if (success) {
    return solution;
  }
}

async function askPlayNext() {
  const answers = await inquirer.prompt([
    {
      type: "confirm",
      name: "playNext",
      message: "Do you want to play the next puzzle?"
    }
  ]);

  console.log();

  return answers.playNext;
}

async function askTryAgain() {
  const answers = await inquirer.prompt([
    {
      type: "confirm",
      name: "tryAgain",
      message: "Do you want to try again?"
    }
  ]);

  console.log();

  return answers.tryAgain;
}

function printCode(code) {
  code = code.toUpperCase();
  let i = 0;

  const positions = [];
  const opcodesHex = [];
  const opcodes = [];

  let opcodeHexColumnWidth = 0;

  while (i < code.length) {
    let opcodeHex = code.slice(i, i + 2);
    let [opcode, pushSize] = getOpcode(opcodeHex);

    const position = (i / 2)
      .toString(16)
      .toUpperCase()
      .padStart(2, "0");

    positions.push({ value: position, color: "gray" });

    let opcodeHexItem;
    let opcodeItem;
    if (pushSize) {
      const pushArg = code.slice(i + 2, i + 2 + 2 * pushSize);
      opcodeHexItem = { value: opcodeHex + pushArg, color: null };
      opcodeItem = { value: `${opcode}${pushSize} ${pushArg}`, color: null };
      i += 2 + 2 * pushSize;
    } else {
      let color = null;
      if (opcode === "STOP") {
        color = "green";
      } else if (opcode === "REVERT") {
        color = "red";
      } else if (opcode === "JUMPDEST") {
        color = "cyan";
      }
      opcodeHexItem = { value: opcodeHex, color };
      opcodeItem = { value: opcode, color };
      i += 2;
    }

    opcodeHexColumnWidth = Math.max(
      opcodeHexColumnWidth,
      opcodeHexItem.value.length
    );

    opcodes.push(opcodeItem);
    opcodesHex.push(opcodeHexItem);
  }

  const colorize = ({ value, color }, padEnd = 0) => {
    const paddedValue = value.padEnd(padEnd, " ");
    return color ? chalk[color](paddedValue) : paddedValue;
  };

  for (let i = 0; i < positions.length; i++) {
    console.log(
      colorize(positions[i]),
      "    ",
      colorize(opcodesHex[i], opcodeHexColumnWidth + 5),
      colorize(opcodes[i])
    );
  }
}

async function readSolution(askForData, askForValue) {
  const solution = await inquirer.prompt([
    {
      type: "number",
      name: "value",
      message: "Enter the value to send:",
      default: 0,
      when: askForValue
    },
    {
      type: "input",
      name: "data",
      message: "Enter the calldata:",
      when: askForData,
      filter: function normalizeCallData(x) {
        x = x.startsWith("0x") ? x.slice(2) : x;
        x = x.length % 2 === 0 ? x : "0" + x;
        return "0x" + x;
      },
    }
  ]);

  if (!askForValue) {
    solution.value = 0;
  }
  if (!askForData) {
    solution.data = "0x";
  }

  return solution;
}

async function runPuzzle(puzzleCode, { data, value }) {
  const [s] = await ethers.getSigners();

  const address = "0xffffffffffffffffffffffffffffffffffffffff";

  await hre.network.provider.send("hardhat_setCode", [
    address,
    `0x${puzzleCode}`
  ]);

  data = data.startsWith("0x") ? data : `0x${data}`;

  const evmCodesUrlData = data === "0x" ? "" : data;
  const evmCodesUrl = `https://www.evm.codes/playground?callValue=${value}&unit=Wei&callData=${evmCodesUrlData}&codeType=Bytecode&code='${puzzleCode}'_`;

  try {
    await s.sendTransaction({
      to: address,
      data,
      gasLimit: 1_000_000,
      value
    });
    return [true, evmCodesUrl];
  } catch (e) {
    return [false, evmCodesUrl];
  }
}

function printTitle(i) {
  const text = `Puzzle ${i}`;
  const width = text.length + 4;
  console.log("#".repeat(width));
  console.log(`# ${text} #`);
  console.log("#".repeat(width));
}

function getNextPuzzle() {
  const { root } = hre.config.paths;
  const solutionsDir = resolve(root, "solutions");
  const puzzlesDir = resolve(root, "puzzles");

  fs.ensureDirSync(solutionsDir);

  const numberOfPuzzles = fs
    .readdirSync(resolve(root, "puzzles"))
    .filter(x => !x.startsWith(".")).length;

  for (let i = 1; i <= numberOfPuzzles; i++) {
    const solutionPath = resolve(solutionsDir, `solution_${i}.json`);
    if (!fs.existsSync(solutionPath)) {
      const puzzle = fs.readJsonSync(resolve(puzzlesDir, `puzzle_${i}.json`));
      return {
        ...puzzle,
        number: i
      };
    }
  }
}

function saveSolution(puzzleNumber, solution) {
  const { root } = hre.config.paths;
  const solutionsDir = resolve(root, "solutions");

  fs.writeJsonSync(
    resolve(solutionsDir, `solution_${puzzleNumber}.json`),
    solution
  );
}
