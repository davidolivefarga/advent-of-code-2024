const input = require("./input");

function solve(pairs) {
    const rightListFrequency = {};

    pairs.forEach(p => {
        rightListFrequency[p[1]] = (rightListFrequency[p[1]] || 0) + 1;
    });

    let similarityScore = 0;

    for (let i = 0; i < pairs.length; i++) {
        similarityScore += pairs[i][0] * (rightListFrequency[pairs[i][0]] || 0)
    }

    return similarityScore;
}

console.log(solve(input));