const input = require("./input");

function solve({ rules, updates }) {
    const validUpdates = updates.filter((u) => isValidUpdate(rules, u));

    let middlePagesSum = 0;

    validUpdates.forEach((u) => (middlePagesSum += u[u.length >> 1]));

    return middlePagesSum;
}

function isValidUpdate(rules, update) {
    const pagePositions = {};

    update.forEach((page, pagePos) => (pagePositions[page] = pagePos));

    for (const [page1, page2] of rules) {
        const page1Pos = pagePositions[page1];
        const page2Pos = pagePositions[page2];

        if (page1Pos >= 0 && page2Pos >= 0 && page1Pos > page2Pos) {
            return false;
        }
    }

    return true;
}

console.log(solve(input));
