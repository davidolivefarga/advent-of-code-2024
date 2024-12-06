# Day 5: Print Queue

You can find the puzzles [here](https://adventofcode.com/2024/day/5).

## ✍🏼 Input

This time we're working with a book and its pages, which are represented as positive integers.

-   `rules`: a list of rules, each indicating the order in which two pages must be within a book (for example, `[47, 53]` means that page `47` must appear before page `53`, but not necessarily immediately before it).
-   `updates`: a list of updates, each representing a list of pages that must be updated.

Example:

```js
const input = {
    rules: [
        [47, 53],
        [97, 13],
        [97, 61],
        // ...
    ],
    updates: [
        [75, 47, 61, 53, 29],
        [97, 61, 53, 29, 13],
        [75, 29, 13],
        [75, 97, 47, 61, 53],
        [61, 13, 29],
        [97, 13, 75, 29, 47],
    ],
};
```

## 🧩 First puzzle

### Objective

Each update can be valid or not, depending on whether it satisfies all the rules.

For each valid update, find its middle page and then sum all the middle pages.

### Solution

Straight-forward solution, nothing interesting to add.

```js
function solve({ rules, updates }) {
    const validUpdates = updates.filter((u) => isValidUpdate(rules, u));

    let middlePagesSum = 0;

    validUpdates.forEach((u) => (middlePagesSum += u[u.length >> 1]));

    return middlePagesSum;
}

function isValidUpdate(rules, update) {
    const pagePositions = {};

    update.forEach((page, pagePos) => (pagePositions[page] = pagePos));

    for (const [page1, page2] of rules) {
        const page1Pos = pagePositions[page1];
        const page2Pos = pagePositions[page2];

        if (page1Pos >= 0 && page2Pos >= 0 && page1Pos > page2Pos) {
            return false;
        }
    }

    return true;
}
```

## 🧩 Second puzzle

### Objective

Each invalid update can be fixed in a way that is satisfies all the rules.

For each invalid updated, fix it, find its middle page and then sum all the middle pages.

### Solution

The only tricky part here is that fixing a rule might break a previous one. The simplest way to take care of this is to keep iterating over all rules and applying rule fixes until the update is valid.

Not very proud of my code, too many loops and repeated calculations... But if I didn't have much time. I will try to make it better at some point in the future.

```js
function solve({ rules, updates }) {
    const invalidUpdates = updates.filter((u) => !isValidUpdate(rules, u));
    const fixedUpdates = invalidUpdates.map((u) => fixUpdate(rules, u));

    let middlePagesSum = 0;

    fixedUpdates.forEach((u) => (middlePagesSum += u[u.length >> 1]));

    return middlePagesSum;
}

function isValidUpdate(rules, update) {
    // Same as before
}

function fixUpdate(rules, update) {
    const fixedUpdate = [...update];

    while (!isValidUpdate(rules, fixedUpdate)) {
        const pagePositions = {};

        fixedUpdate.forEach((page, pagePos) => (pagePositions[page] = pagePos));

        for (const [page1, page2] of rules) {
            const page1Pos = pagePositions[page1];
            const page2Pos = pagePositions[page2];

            if (page1Pos >= 0 && page2Pos >= 0 && page1Pos > page2Pos) {
                fixedUpdate[page1Pos] = page2;
                fixedUpdate[page2Pos] = page1;

                pagePositions[page1] = page2Pos;
                pagePositions[page2] = page1Pos;
            }
        }
    }

    return fixedUpdate;
}
```
