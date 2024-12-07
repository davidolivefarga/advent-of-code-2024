const input = require("./input");

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

console.log(solve(input));
