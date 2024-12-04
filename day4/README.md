# Day 4: Ceres Search

You can find the puzzles [here](https://adventofcode.com/2024/day/4).

## ✍🏼 Input

A word search (a matrix with characters), whose entries are either an `X`, an `M`, an `A` or an `S`.

Example:

```js
const input = [
    ["M", "M", "M", "S", "X", "X", "M", "A", "S", "M"],
    ["M", "S", "A", "M", "X", "M", "S", "M", "S", "A"],
    ["A", "M", "X", "S", "X", "M", "A", "A", "M", "M"],
    ["M", "S", "A", "M", "A", "S", "M", "S", "M", "X"],
    ["X", "M", "A", "S", "A", "M", "X", "A", "M", "M"],
    ["X", "X", "A", "M", "M", "X", "X", "A", "M", "A"],
    ["S", "M", "S", "M", "S", "A", "S", "X", "S", "S"],
    ["S", "A", "X", "A", "M", "A", "S", "A", "A", "A"],
    ["M", "A", "M", "M", "M", "X", "M", "M", "M", "M"],
    ["M", "X", "M", "X", "A", "X", "M", "A", "S", "X"],
];
```

## 🧩 First puzzle

### Objective

Count the number of times the word `XMAS` appears on the word search.

This word search allows words to be horizontal, vertical, diagonal, written backwards, or even overlapping other words.

### Solution

Straight-forward solution, nothing interesting to add.

```js
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
```

## 🧩 Second puzzle

### Objective

Count the number of times the X-MAS pattern appears on the word search.

The X-MAS pattern consists on two `MAS` in the shape of an X.

For example (`.` indicates an irrelevant character for the pattern):

```
M.S
.A.
M.S
```

Within the X, each `MAS` can be written forwards or backwards.

### Solution

Straight-forward solution, nothing interesting to add.

```js
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
```
