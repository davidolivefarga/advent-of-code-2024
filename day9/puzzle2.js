const input = require("./input");

function solve(disk) {
    const filesBySize = getFilesBySize(disk);
    const filesUsed = new Set();

    let checkSum = 0;

    let blockPos = 0;

    for (let diskPos = 0; diskPos < disk.length; diskPos++) {
        if (diskPos % 2 === 0 && !filesUsed.has(diskPos)) {
            const fileId = diskPos / 2;
            const fileSize = disk[diskPos];

            for (let i = 0; i < fileSize; i++) {
                checkSum += blockPos * fileId;
                blockPos++;
            }

            filesUsed.add(diskPos);
        } else {
            let emptySize = disk[diskPos];
            let filePosition;

            while (
                (filePosition = findFileToMove(
                    filesBySize,
                    filesUsed,
                    emptySize
                ))
            ) {
                const fileId = filePosition / 2;
                const fileSize = disk[filePosition];

                for (let i = 0; i < fileSize; i++) {
                    checkSum += blockPos * fileId;
                    blockPos++;
                }

                filesBySize[fileSize].pop();
                filesUsed.add(filePosition);

                emptySize -= fileSize;
            }

            for (let i = 0; i < emptySize; i++) {
                blockPos++;
            }
        }
    }

    return checkSum;
}

function getFilesBySize(disk) {
    const filesBySize = Array.from({ length: 10 }, (_) => []);

    for (let diskPos = 0; diskPos < disk.length; diskPos += 2) {
        filesBySize[disk[diskPos]].push(diskPos);
    }

    return filesBySize;
}

function findFileToMove(filesBySize, filesUsed, emptySize) {
    let filePosToMove = -Infinity;

    for (let i = emptySize; i >= 0; i--) {
        const filePos = filesBySize[i].at(-1);

        if (!filesUsed.has(filePos) && filePos > filePosToMove) {
            filePosToMove = filePos;
        }
    }

    return filePosToMove === -Infinity ? undefined : filePosToMove;
}

console.log(solve(input));
