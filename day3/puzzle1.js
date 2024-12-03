const input = require("./input");

function solve(memory) {
    const matches = memory.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g);

    let sumMultiplications = 0;

    [...matches].forEach(([_, num1, num2]) => {
        sumMultiplications += +num1 * +num2;
    });

    return sumMultiplications;
}

console.log(solve(input));
