const input = require("./input");

function solve(disk) {
    let checkSum = 0;

    let leftDiskPos = 0;
    let rightDiskPos = disk.length - 1;

    let blockPos = 0;

    while (leftDiskPos <= rightDiskPos) {
        if (leftDiskPos % 2 === 0) {
            const fileId = leftDiskPos / 2;
            const fileSize = disk[leftDiskPos];

            for (let i = 0; i < fileSize; i++) {
                checkSum += blockPos * fileId;
                blockPos++;
            }
        } else {
            const emptySize = disk[leftDiskPos];

            for (let i = 0; i < emptySize; i++) {
                while (disk[rightDiskPos] === 0) {
                    rightDiskPos -= 2;
                }

                const fileId = rightDiskPos / 2;

                checkSum += blockPos * fileId;
                disk[rightDiskPos]--;
                blockPos++;
            }
        }

        leftDiskPos++;
    }

    return checkSum;
}

console.log(solve(input));
