const input = require("./input");

const GUARD = "^";
const OBSTACLE = "#";

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
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] === GUARD) {
                return [i, j];
            }
        }
    }
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

console.log(solve(input));
