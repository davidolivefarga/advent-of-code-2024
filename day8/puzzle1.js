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

    const antinodes = [
        [pos1[0] + v[0], pos1[1] + v[1]],
        [pos2[0] - v[0], pos2[1] - v[1]],
    ];

    return antinodes.filter((antinode) => isWithinMap(map, antinode));
}

function isWithinMap(map, pos) {
    const m = map.length;
    const n = map[0].length;

    return pos[0] >= 0 && pos[0] < m && pos[1] >= 0 && pos[1] < n;
}

console.log(solve(input));
