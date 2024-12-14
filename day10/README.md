# Day 10: Hoof It

You can find the puzzles [here](https://adventofcode.com/2024/day/10).

## ✍🏼 Input

A map, where each tile is represented a single digit (from `0` to `9`).

-   The `0` tiles represent the origins
-   The `9` tiles represent the destinations

Example:

```js
const input = [
    [0, 1, 2, 3],
    [1, 2, 3, 4],
    [8, 7, 6, 5],
    [9, 8, 7, 6],
];
```

We can move from one tile to another only if the value increases by 1 (for example, we can move from `2` to `3` but not from `2` to `4`).

It is not possible to move diagonally, only up/down and left/right movements are allowed.

## 🧩 First puzzle

### Objective

Given an origin, its score is the number of destinations it can reach.

Find the sum of the scores of all origins.

### Solution

There are many ways to solve this puzzle, I chose a recursion-based [DFS (Depth-First Search)](https://en.wikipedia.org/wiki/Depth-first_search) combined with a set to keep track of the visited positions, to avoid counting the same destination twice.

```js
const ORIGIN_TILE = 0;
const DESTINATION_TILE = 9;

const DIRECTIONS = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
];

function solve(map) {
    const origins = [];

    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
            if (map[i][j] === ORIGIN_TILE) {
                origins.push([i, j]);
            }
        }
    }

    let pathsCount = 0;

    origins.forEach((origin) => {
        pathsCount += countPaths(map, origin);
    });

    return pathsCount;
}

function countPaths(map, origin) {
    const visitedPositions = new Set();

    let paths = 0;

    function iterate(pos) {
        if (visitedPositions.has(pos.toString())) {
            return;
        }

        visitedPositions.add(pos.toString());

        const tile = map[pos[0]][pos[1]];

        if (tile === DESTINATION_TILE) {
            paths++;
        } else {
            DIRECTIONS.forEach((dir) => {
                const nextPos = [pos[0] + dir[0], pos[1] + dir[1]];
                const nextTile = map[nextPos[0]]?.[nextPos[1]];

                if (nextTile === tile + 1) {
                    iterate(nextPos);
                }
            });
        }
    }

    iterate(origin);

    return paths;
}
```

## 🧩 Second puzzle

### Objective

Given an origin, its score is now the number of different paths that connect it to a destination.

Find the sum of the scores of all origins.

### Solution

Again, there are many ways to solve it. In my case, I chose a [dynamic programming](https://en.wikipedia.org/wiki/Dynamic_programming), which consists on recursively solving sub-problems while caching them to avoid doing the same computations multiple times.

```js
const ORIGIN_TILE = 0;
const DESTINATION_TILE = 9;

const DIRECTIONS = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
];

function solve(map) {
    const origins = [];

    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
            if (map[i][j] === ORIGIN_TILE) {
                origins.push([i, j]);
            }
        }
    }

    let pathsCount = 0;

    origins.forEach((origin) => {
        pathsCount += countPaths(map, origin);
    });

    return pathsCount;
}

function countPaths(map, origin) {
    const cachedResults = {};

    function iterate(pos) {
        const posAsString = pos.toString();

        if (!cachedResults[posAsString]) {
            const tile = map[pos[0]][pos[1]];

            let paths = 0;

            if (tile === DESTINATION_TILE) {
                paths++;
            } else {
                DIRECTIONS.forEach((dir) => {
                    const nextPos = [pos[0] + dir[0], pos[1] + dir[1]];
                    const nextTile = map[nextPos[0]]?.[nextPos[1]];

                    if (nextTile === tile + 1) {
                        paths += iterate(nextPos);
                    }
                });
            }

            cachedResults[posAsString] = paths;
        }

        return cachedResults[posAsString];
    }

    return iterate(origin);
}
```
