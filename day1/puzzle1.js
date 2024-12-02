const input = require("./input");

function solve(pairs) {
    const list1 = pairs.map(p => p[0]);
    const list2 = pairs.map(p => p[1]);

    list1.sort();
    list2.sort();

    let totalDistance = 0;

    for (let i = 0; i < pairs.length; i++) {
        totalDistance += Math.abs(list1[i] - list2[i]);
    }

    return totalDistance;
}

console.log(solve(input));

