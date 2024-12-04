const input = require("./input");

const TARGET_WORD = "XMAS";

function solve(wordSearch) {
    const rows = wordSearch.length;
    const cols = wordSearch[0].length;

    const directions = getDirections();

    let wordCount = 0;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            for (const direction of directions) {
                if (hasWordMatch(wordSearch, [i, j], direction)) {
                    wordCount++;
                }
            }
        }
    }

    return wordCount;
}

function getDirections() {
    const directions = [];

    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i !== 0 || j !== 0) {
                directions.push([i, j]);
            }
        }
    }

    return directions;
}

function hasWordMatch(wordSearch, pos, direction) {
    for (let i = 0; i < TARGET_WORD.length; i++) {
        if (
            TARGET_WORD[i] !==
            wordSearch[pos[0] + i * direction[0]]?.[pos[1] + i * direction[1]]
        ) {
            return false;
        }
    }

    return true;
}

console.log(solve(input));
