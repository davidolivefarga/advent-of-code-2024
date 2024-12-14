# Day 9: Disk Fragmenter

You can find the puzzles [here](https://adventofcode.com/2024/day/9).

## ✍🏼 Input

A disk map, consisting on a list of single digit numbers (between 0 and 9).

Example:

```js
const input = [2, 3, 3, 3, 1, 3, 3, 1, 2, 1, 4, 1, 4, 1, 3, 1, 4, 0, 2];
```

The disk map represents the layout of files and free space on the disk. The digits alternate between indicating the length of a file and the length of free space. For example, a disk map like `[1,2,3,4,5]` represents a one-block file, two blocks of free space, a three-block file, four blocks of free space, and then a five-block file.

Each file on disk also has an ID number based on the order of the files as they appear before they are rearranged, starting with ID 0. So, the disk map `[1,2,3,4,5]` has three files: a one-block file with ID 0, a three-block file with ID 1, and a five-block file with ID 2. Using one character for each block where digits are the file ID and `.` is free space, the disk map `[1,2,3,4,5]` represents these individual blocks: `0..111....22222`.

## 🧩 First puzzle

### Objective

We want to move file blocks one at a time from the end of the disk to the leftmost free space block, until there are no gaps remaining between file blocks.

Then, we want to compute the filesystem checksum. To calculate it, we must add up the result of multiplying each of these blocks' position with the file ID number it contains. The leftmost block is in position 0. If a block contains free space, skip it instead.

### Solution

The naive solution to this puzzle is to create an array representing the blocks and simulate the process of moving file blocks one by one. However, I wanted to challenge myself and attempt to do it with a single pass on the disk and without using additional space. It took me a while, but I managed to do it.

The key to this solution is to keep three position pointers:

-   One that starts at the left-most position on the disk map, `leftDiskPos`, and will be used to advance through the disk map.
-   One that starts at the right-most position on the disk map, `rightDiskPos`, and will be used to keep track of the rightmost file position.
-   One that starts at 0, `blockPos`, and will be used to keep track of the current block position.

We also use the disk map form the puzzle input, `disk`, to know the size of each file and each empty space. As we will see now, it can be modified to keep track of the remaining blocks of each file.

As we advance through the disk map with `leftDiskPos`, there are two possibilities:

-   We're in an even position, which means we're dealing with a file. In that case, we can calculate the file ID and the file size using the file position and `disk` and add that many file blocks with that ID, updating the checksum and the `blockPos` pointer in the process.
-   We're in an odd position, which means we're dealing with empty space. This is where it gets tricky, because we need to find which file blocks will occupy that space. However, we can use `rightDiskPos` to know what's the rightmost available file position, calculate the file ID and file size from it and the disk map, and add as many file blocks of that file ID as we can fit in that empty space, updating the checksum and the `blockPos` pointer in the process. There are two possible scenarios:
    -   We run out of file blocks with that ID and we still have empty space. In that case, we move `rightDiskPos` two steps to the left so that it points to the next rightmost available file, and continue the process until there's no empty space left.
    -   We fill all the empty space but we don't use all the blocks of the rightmost file. These blocks will be used in the next empty space, so we must keep track of them. To do this without using additional space, we can directly modify `disk`, updating the file size accordingly.

Now that we have the process defined, we just need to find a condition to stop, but this one is quite straight-forward: we just need to stop once `leftDiskPos > rightDiskPos`.

```js
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
```

## 🧩 Second puzzle

### Objective

Same as before, but this time instead of moving file blocks one by one, we want to move whole files to the leftmost span of free space blocks that could fit the file. To do that, we will attempt to move each file exactly once in order of decreasing file ID number starting with the file with the highest file ID number. If there is no span of free space to the left of a file that is large enough to fit the file, the file won't move.

### Solution

After spending quite some time on the solution, I finally managed to achieve in `O(n)`.

The core idea is the same as before: we advance through the disk and process files and spaces from left-to-right.

We can have these scenarios:

-   We encounter a file:
    -   If it hasn't been moved yet, then we update the checksum and advance the block position same way we did in the first puzzle.
    -   If it been already moved, then it means we have to treat it as if we had encountered an empty space, see steps below.
-   We encounter an empty space:
    -   If we can find a file to place in that empty space, we use its ID to update the checksum and advance the block position accordingly. However, here comes the tricky part... How to find that file? The naive solution would be to scan the disk from right-to-left until we find a file that fits and hasn't been moved yet. However, this is `O(n)`, which is not good... But we can use a clever trick here! The key idea is to realize that if we only need to check the right-most file of each size that hasn't been moved yet. Why? Because if the right-most file has size `s` and cannot fit, then neither will fit any other file of size `s`. Using a structure to keep track of the sorted positions of each file by size, along with a structure to keep track of moved files, we just need to choose amongst 10 candidates, one for each possible size... And this is now `O(1)`!
    -   If there is no file that can fit in that space (either because all of them are too big or because there are no files left to move), then we advance the block position accordingly without updating the checksum, as empty block don't count.

```js
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
```
