const input = require("./input");

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

console.log(solve(input));
