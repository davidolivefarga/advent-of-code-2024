const fs = require("fs");
const path = require("path");

const rawInputPath = path.join(__dirname, "input.txt");
const rawInput = fs.readFileSync(rawInputPath, "utf8");

const [rawRules, rawUpdates] = rawInput.trim().split("\n\n");

module.exports = {
    rules: rawRules
        .trim()
        .split("\n")
        .map((r) => r.split("|").map(Number)),
    updates: rawUpdates
        .trim()
        .split("\n")
        .map((u) => u.split(",").map(Number)),
};
