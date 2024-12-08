const input = require("./input");

const EMPTY_TILE = ".";

function solve(map) {
    const antennaPositions = getAntennaPositions(map);
    const antinodePositions = new Set();

    Object.values(antennaPositions).forEach((positions) => {
        for (let i = 0; i < positions.length; i++) {
            for (let j = i + 1; j < positions.length; j++) {
                const antinodes = getAntinodes(map, positions[i], positions[j]);

                antinodes.forEach((antinode) => {
                    antinodePositions.add(antinode.toString());
                });
            }
        }
    });

    return antinodePositions.size;
}

function getAntennaPositions(map) {
    const m = map.length;
    const n = map[0].length;

    const antennaPositions = {};

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (map[i][j] !== EMPTY_TILE) {
                if (!antennaPositions[map[i][j]]) {
                    antennaPositions[map[i][j]] = [[i, j]];
                } else {
                    antennaPositions[map[i][j]].push([i, j]);
                }
            }
        }
    }

    return antennaPositions;
}

function getAntinodes(map, pos1, pos2) {
    const v = [pos1[0] - pos2[0], pos1[1] - pos2[1]];
    const vGcd = gcd(v[0], v[1]);
    const vNormalized = [v[0] / vGcd, v[1] / vGcd];

    let antinode = pos1;

    const antinodes = [antinode];

    antinode = [pos1[0] + vNormalized[0], pos1[1] + vNormalized[1]];

    while (isWithinMap(map, antinode)) {
        antinodes.push(antinode);

        antinode = [antinode[0] + vNormalized[0], antinode[1] + vNormalized[1]];
    }

    antinode = [pos1[0] - vNormalized[0], pos1[1] - vNormalized[1]];

    while (isWithinMap(map, antinode)) {
        antinodes.push(antinode);

        antinode = [antinode[0] - vNormalized[0], antinode[1] - vNormalized[1]];
    }

    return antinodes;
}

function gcd(a, b) {
    if (!b) {
        return a;
    }

    return gcd(b, a % b);
}

function isWithinMap(map, pos) {
    const m = map.length;
    const n = map[0].length;

    return pos[0] >= 0 && pos[0] < m && pos[1] >= 0 && pos[1] < n;
}

console.log(solve(input));
