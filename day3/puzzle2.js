const input = require("./input");

function solve(memory) {
    const matches = memory.matchAll(/mul\((\d{1,3}),(\d{1,3})\)|don't|do/g);

    let sumMultiplications = 0;
    let multiplicationsEnabled = true;

    [...matches].forEach((match) => {
        if (match[0] === "do") {
            multiplicationsEnabled = true;
        } else if (match[0] === "don't") {
            multiplicationsEnabled = false;
        } else if (multiplicationsEnabled) {
            sumMultiplications += +match[1] * +match[2];
        }
    });

    return sumMultiplications;
}

console.log(solve(input));