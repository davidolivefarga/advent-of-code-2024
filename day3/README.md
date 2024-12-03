# Day 3: Mull It Over

You can find the puzzles [here](https://adventofcode.com/2024/day/3).

## ✍🏼 Input

A memory represented as a string.

It contains instructions of the type `mul(X,Y)`, where `X` and `Y` are each 1-3 digit numbers, and other random characters.

Example:

```js
const input = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64]undo()?mul(8,5))";
```

## 🧩 First puzzle

### Objective

Find all instructions, calculate their multiplication and add all of them.

### Solution

Straight-forward solution, nothing interesting to add.

```js
function solve(memory) {
    const matches = memory.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g);

    let sumMultiplications = 0;

    [...matches].forEach(([_, num1, num2]) => {
        sumMultiplications += +num1 * +num2;
    });

    return sumMultiplications;
}
```

## 🧩 Second puzzle

### Objective

This time we consider two new types of instructions:

-   `do`: enable future `mul(X,Y)` instructions.
-   `don't`: disable future `mul(X,Y)` instructions.

At the beginning of the program, multiplications are enabled.

Find all enabled `mul(X,Y)` instructions, calculate their multiplication and add all of them.

### Solution

Straight-forward solution, nothing interesting to add.

```js
function solve(memory) {
    const matches = memory.matchAll(/mul\((\d{1,3}),(\d{1,3})\)|don't|do/g);

    let sumMultiplications = 0;
    let multiplicationsEnabled = true;

    [...matches].forEach((match) => {
        if (match[0] === "do") {
            multiplicationsEnabled = true;
        } else if (match[0] === "don't") {
            multiplicationsEnabled = false;
        } else if (multiplicationsEnabled) {
            sumMultiplications += +match[1] * +match[2];
        }
    });

    return sumMultiplications;
}
```
