const input = require("./input");

function solve(reports) {
    return reports.filter(isReportSafe).length;
}

function isReportSafe(report) {
    if (report.length === 1) {
        return true;
    }

    const firstDiff = report[1] - report[0];

    for (let i = 1; i < report.length; i++) {
        const diff = report[i] - report[i - 1];

        if (firstDiff * diff < 0) {
            return false;
        }

        const absDiff = Math.abs(diff);

        if (absDiff < 1 || absDiff > 3) {
            return false;
        }
    }

    return true;
}

console.log(solve(input));

