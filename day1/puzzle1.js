const input = require("./input");

function solve(pairs) {
    const leftList = pairs.map(p => p[0]);
    const rightList = pairs.map(p => p[1]);

    leftList.sort();
    rightList.sort();

    let totalDistance = 0;

    for (let i = 0; i < pairs.length; i++) {
        totalDistance += Math.abs(leftList[i] - rightList[i]);
    }

    return totalDistance;
}

console.log(solve(input));

