const input = require("./input");

function solve({ rules, updates }) {
    const invalidUpdates = updates.filter((u) => !isValidUpdate(rules, u));
    const fixedUpdates = invalidUpdates.map((u) => fixUpdate(rules, u));

    let middlePagesSum = 0;

    fixedUpdates.forEach((u) => (middlePagesSum += u[u.length >> 1]));

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

function fixUpdate(rules, update) {
    const fixedUpdate = [...update];

    while (!isValidUpdate(rules, fixedUpdate)) {
        const pagePositions = {};

        fixedUpdate.forEach((page, pagePos) => (pagePositions[page] = pagePos));

        for (const [page1, page2] of rules) {
            const page1Pos = pagePositions[page1];
            const page2Pos = pagePositions[page2];

            if (page1Pos >= 0 && page2Pos >= 0 && page1Pos > page2Pos) {
                fixedUpdate[page1Pos] = page2;
                fixedUpdate[page2Pos] = page1;

                pagePositions[page1] = page2Pos;
                pagePositions[page2] = page1Pos;
            }
        }
    }

    return fixedUpdate;
}

console.log(solve(input));
