const input = require("./input");

function solve(disk) {
    const filesPosBySize = getFilesPosBySize(disk);

    let checkSum = 0;
    let blockPos = 0;

    for (let diskPos = 0; diskPos < disk.length; diskPos++) {
        if (diskPos % 2 === 0) {
            const fileId = diskPos / 2;
            const fileSize = disk[diskPos];

            if (filesPosBySize[fileSize].includes(diskPos)) {
                for (let i = 0; i < fileSize; i++) {
                    checkSum += blockPos * fileId;
                    blockPos++;
                }

                filesPosBySize[fileSize] = filesPosBySize[fileSize].filter(
                    (pos) => pos !== diskPos
                );
            } else {
                for (let i = 0; i < fileSize; i++) {
                    blockPos++;
                }
            }
        } else {
            let emptySize = disk[diskPos];
            let filePosToMove;

            while (
                (filePosToMove = findFilePosToMove(filesPosBySize, emptySize))
            ) {
                const fileId = filePosToMove / 2;
                const fileSize = disk[filePosToMove];

                for (let i = 0; i < fileSize; i++) {
                    checkSum += blockPos * fileId;
                    blockPos++;
                }

                filesPosBySize[fileSize].pop();

                emptySize -= fileSize;
            }

            for (let i = 0; i < emptySize; i++) {
                blockPos++;
            }
        }
    }

    return checkSum;
}

function getFilesPosBySize(disk) {
    const filesPositionBySize = {};

    for (let i = 0; i <= 9; i++) {
        filesPositionBySize[i] = [];
    }

    for (let diskPos = 0; diskPos < disk.length; diskPos += 2) {
        filesPositionBySize[disk[diskPos]].push(diskPos);
    }

    return filesPositionBySize;
}

function findFilePosToMove(filesPosBySize, emptySize) {
    let filePosToMove = -Infinity;

    for (let i = emptySize; i >= 0; i--) {
        const filePos = filesPosBySize[i].at(-1);

        if (filePos > filePosToMove) {
            filePosToMove = filePos;
        }
    }

    if (filePosToMove === -Infinity) {
        return;
    }

    return filePosToMove;
}

console.log(solve(input));
