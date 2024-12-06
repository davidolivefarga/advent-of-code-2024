const input = require("./input");

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

console.log(solve(input));
