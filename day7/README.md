# Day 7: Bridge Repair

You can find the puzzles [here](https://adventofcode.com/2024/day/7).

## ✍🏼 Input

A list of equations, where an equation is represented by a value and a list of positive integers.

Example:

```js
const input = [
    [190, [10, 19]],
    [3267, [81, 40, 27]],
    [83, [17, 5]],
    [156, [15, 6]],
    [7290, [6, 8, 6, 15]],
    [161011, [16, 10, 13]],
    [192, [17, 8, 14]],
    [21037, [9, 7, 18, 13]],
    [292, [11, 6, 16, 20]],
];
```

## 🧩 First puzzle

### Objective

An equation is considered valid if we can add operators amongst the numbers to obtain the equation value.

Only the `+` and `*` operators can be used, and they are evaluated left-to-right, ignoring the standard order of operations.

Calculate the sum of the values of all valid equations.

### Solution

Using recursion to iterate over all possible combinations of operators amongst the numbers, until we find a valid one or we run out of combinations.

Since we're dealing with positive integers and the `+` and `*` operators can only increase the value, we can stop iterating once we accumulate a value bigger than our target.

```js
function solve(equations) {
    const validEquations = equations.filter(isValidEquation);

    let validEquationValuesSum = 0;

    for (const equation of validEquations) {
        validEquationValuesSum += equation[0];
    }

    return validEquationValuesSum;
}

function isValidEquation(equation) {
    const [value, numbers] = equation;

    function iterate(currentValue, i) {
        if (currentValue > value) {
            return false;
        }

        if (i === numbers.length) {
            return currentValue === value;
        }

        return (
            iterate(currentValue + numbers[i], i + 1) ||
            iterate(currentValue * numbers[i], i + 1)
        );
    }

    return iterate(numbers[0], 1);
}
```

## 🧩 Second puzzle

### Objective

Same as before, but this time we have another operator: `||`. This operator combines the digits from its left and right inputs into a single number. For example, `12 || 345 = 12345`.

### Solution

Same idea, just adding one more option for the new operator. Since it can only increase the value, we can keep the optimization to stop iterating once we accumulate a value bigger than our target.

```js
function solve(equations) {
    const validEquations = equations.filter(isValidEquation);

    let validEquationValuesSum = 0;

    for (const equation of validEquations) {
        validEquationValuesSum += equation[0];
    }

    return validEquationValuesSum;
}

function isValidEquation(equation) {
    const [value, numbers] = equation;

    function iterate(currentValue, i) {
        if (currentValue > value) {
            return false;
        }

        if (i === numbers.length) {
            return currentValue === value;
        }

        return (
            iterate(currentValue + numbers[i], i + 1) ||
            iterate(currentValue * numbers[i], i + 1) ||
            iterate(+("" + currentValue + numbers[i]), i + 1)
        );
    }

    return iterate(numbers[0], 1);
}
```
