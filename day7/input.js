const fs = require("fs");
const path = require("path");

const rawInputPath = path.join(__dirname, "input.txt");
const rawInput = fs.readFileSync(rawInputPath, "utf8");

const input = rawInput
    .trim()
    .split("\n")
    .map((equation) => {
        const [rawTarget, rawNumbers] = equation.split(": ");

        return [Number(rawTarget), rawNumbers.split(" ").map(Number)];
    });

module.exports = input;
