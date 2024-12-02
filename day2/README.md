# Day 2: Red-Nosed Reports

You can find the puzzles [here](https://adventofcode.com/2024/day/2).

## ✍🏼 Input

A list of reports, with each report consisting in a list of levels. A level is represented by a positive integer.

Example:

```js
const input = [
    [7, 6, 4, 2, 1],
    [1, 2, 7, 8, 9],
    [9, 7, 6, 2, 1],
    [1, 3, 2, 4, 5],
    [8, 6, 4, 4, 1],
    [1, 3, 6, 7, 9],
];
```

## 🧩 First puzzle

### Objective

Count the amount of valid reports.

A report is considered valid if:

-   The levels are either all increasing or all decreasing.
-   Any two adjacent levels differ by at least one and at most three.

### Solution

The only thing worth mentioning is that one way to see if two non-zero numbers `a` and `b` have different sign is to check if `ab < 0`. We can use this to see if the list of levels changes from being increasing to being decreasing or vice-versa.

```js
function solve(reports) {
    return reports.filter(isSafeReport).length;
}

function isSafeReport(report) {
    if (report.length === 1) {
        return true;
    }

    const firstDiff = report[1] - report[0];

    for (let i = 1; i < report.length; i++) {
        const diff = report[i] - report[i - 1];
        const absDiff = Math.abs(diff);

        if (absDiff < 1 || absDiff > 3) {
            return false;
        }

        if (firstDiff * diff < 0) {
            return false;
        }
    }

    return true;
}
```

## 🧩 Second puzzle

### Objective

Same as before, but this time a report is also considered valid if removing one of its levels makes it valid.

### Solution

Perhaps there's a clever way to do this in a performant way, but I simply went for the straight-forward approach: keep generating different versions of the report until we find one that is safe; if not, then we can confirm the report is not safe.

```js
function solve(reports) {
    return reports.filter((report) => {
        if (isSafeReport(report)) {
            return true;
        }

        for (let i = 0; i < report.length; i++) {
            const modifiedReport = report.filter((_, index) => index !== i);

            if (isSafeReport(modifiedReport)) {
                return true;
            }
        }

        return false;
    }).length;
}

function isSafeReport(report) {
    // Same as before
}
```
