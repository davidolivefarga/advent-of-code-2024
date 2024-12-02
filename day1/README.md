# Day 1: Historian Hysteria

You can find the puzzles [here](https://adventofcode.com/2024/day/1).

## ✍🏼 Input

Two list of positive integers, each represented as a column in a matrix.

Example:

```js
const input = [
    [3, 4],
    [4, 3],
    [2, 5],
    [1, 3],
    [3, 9],
    [3, 3],
];
```

## 🧩 First puzzle

### Objective

Pair up the smallest number in the left list with the smallest number in the right list, then the second-smallest left number with the second-smallest right number, and so on.

Then, find the total distance between the elements of each of these pairs.

### Solution

Straight-forward solution, nothing interesting to add.

```js
function solve(pairs) {
    const leftList = pairs.map((p) => p[0]);
    const rightList = pairs.map((p) => p[1]);

    leftList.sort();
    rightList.sort();

    let totalDistance = 0;

    for (let i = 0; i < pairs.length; i++) {
        totalDistance += Math.abs(leftList[i] - rightList[i]);
    }

    return totalDistance;
}
```

## 🧩 Second puzzle

### Objective

Calculate the total similarity score, obtained by adding up each number in the left column after multiplying it by the number of times that number appears in the right column.

### Solution

Straight-forward solution, nothing interesting to add.

```js
function solve(pairs) {
    const rightListFrequency = {};

    pairs.forEach((p) => {
        rightListFrequency[p[1]] = (rightListFrequency[p[1]] || 0) + 1;
    });

    let similarityScore = 0;

    for (let i = 0; i < pairs.length; i++) {
        similarityScore += pairs[i][0] * (rightListFrequency[pairs[i][0]] || 0);
    }

    return similarityScore;
}
```
