# Day 6: Guard Gallivant

You can find the puzzles [here](https://adventofcode.com/2024/day/6).

## ✍🏼 Input

A grid representing a map, that has three types of tiles:

-   `.`: an empty tile.
-   `#`: an obstacle.
-   `^`: a guard.

There's exactly one guard in the map, and it starts facing north.

To move across the grid, it follows these rules:

-   If there is an obstacle in front of him, he turns right 90 degrees.
-   Otherwise, he takes a step forward.

Example:

```js
const input = [
    [".", ".", ".", ".", "#", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "#"],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", "#", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", "#", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", "#", ".", ".", "^", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "#", "."],
    ["#", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", "#", ".", ".", "."],
];
```

## 🧩 First puzzle

### Objective

It is guaranteed that if the guard keeps walking, he will eventually leave the map.

Count the number of tiles he visits until he leaves the map.

### Solution

There's only two things worth mentioning regarding this solution:

-   A tile can be visited multiple times from different directions, so we need to keep track of them to avoid counting a tile more than once.
-   The easiest way to calculate the direction change is to consider it as a vector and apply a 90° [rotation matrix](https://en.wikipedia.org/wiki/Rotation_matrix#Common_2D_rotations). Since this matrix has a couple `0`'s, the calculation becomes very simple.

```js
const GUARD = "^";
const OBSTACLE = "#";

function solve(map) {
    let guardPos = getGuardPosition(map);
    let guardDir = [-1, 0];

    const tilesVisitedByGuard = new Set();

    while (true) {
        tilesVisitedByGuard.add(guardPos.toString());

        const nextPos = [guardPos[0] + guardDir[0], guardPos[1] + guardDir[1]];

        if (!map[nextPos[0]]?.[nextPos[1]]) {
            break;
        }

        if (map[nextPos[0]][nextPos[1]] !== OBSTACLE) {
            guardPos = nextPos;
        } else {
            guardDir = [guardDir[1], -guardDir[0]];
        }
    }

    return tilesVisitedByGuard.size;
}

function getGuardPosition(map) {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] === GUARD) {
                return [i, j];
            }
        }
    }
}
```

## 🧩 Second puzzle

### Objective

Count the amount of empty tiles where we can put an obstacle such that the guard gets stuck in a loop.

### Solution

Same ideas as before, but this time the algorithm is much slower, because we need to simulate the process for many maps. If the map has `m` rows and `n` columns, the previous algorithm was `O(n * m)`, this time it is `O(n^2 * m^2)`. It took around ~30 seconds to finish in my machine.

I couldn't find a smarter approach... I might check other solutions on Reddit to find out if it exists.

```js
function solve(map) {
    const guardPos = getGuardPosition(map);
    const guardDir = [-1, 0];

    let loopObstacles = 0;

    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            const tile = map[i][j];

            if (tile !== GUARD && tile !== OBSTACLE) {
                map[i][j] = OBSTACLE;

                if (isGuardStuckInLoop(map, guardPos, guardDir)) {
                    loopObstacles++;
                }

                map[i][j] = tile;
            }
        }
    }

    return loopObstacles;
}

function getGuardPosition(map) {
    // Same as before
}

function isGuardStuckInLoop(map, guardPos, guardDir) {
    const visitedPositionsAndDirections = new Set();

    while (true) {
        const encodedPosAndDir = guardPos + "," + guardDir;

        if (visitedPositionsAndDirections.has(encodedPosAndDir)) {
            return true;
        }

        visitedPositionsAndDirections.add(encodedPosAndDir);

        const nextPos = [guardPos[0] + guardDir[0], guardPos[1] + guardDir[1]];

        if (!map[nextPos[0]]?.[nextPos[1]]) {
            return false;
        }

        if (map[nextPos[0]][nextPos[1]] !== OBSTACLE) {
            guardPos = nextPos;
        } else {
            guardDir = [guardDir[1], -guardDir[0]];
        }
    }
}
```
