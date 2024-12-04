const input = require("./input");

function solve(wordSearch) {
    const rows = wordSearch.length;
    const cols = wordSearch[0].length;

    let patternCount = 0;

    for (let i = 1; i < rows - 1; i++) {
        for (let j = 1; j < cols - 1; j++) {
            if (wordSearch[i][j] === "A") {
                const topLeft = wordSearch[i - 1][j - 1];
                const topRight = wordSearch[i - 1][j + 1];
                const bottomLeft = wordSearch[i + 1][j - 1];
                const bottomRight = wordSearch[i + 1][j + 1];

                if (
                    ((topLeft === "M" && bottomRight === "S") ||
                        (topLeft === "S" && bottomRight === "M")) &&
                    ((topRight === "M" && bottomLeft === "S") ||
                        (topRight === "S" && bottomLeft === "M"))
                ) {
                    patternCount++;
                }
            }
        }
    }

    return patternCount;
}

console.log(solve(input));
