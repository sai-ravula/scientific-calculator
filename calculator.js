let display = document.getElementById('display');
let expression = '';

function appendToDisplay(value) {
    if (display.innerText === '0' && value !== '.') {
        expression = value;
    } else {
        expression += value;
    }
    display.innerText = expression;
}

function appendFunction(func) {
    expression += func;
    display.innerText = expression;
}

function clearDisplay() {
    expression = '';
    display.innerText = '0';
}

function calculate() {
    try {
        // Handle special cases for functions requiring closing parentheses
        let evalExpression = expression;
        // Count open and close parentheses
        const openParens = (expression.match(/\(/g) || []).length;
        const closeParens = (expression.match(/\)/g) || []).length;
        // Add missing closing parentheses for functions like Math.sqrt, Math.log10, etc.
        for (let i = 0; i < openParens - closeParens; i++) {
            evalExpression += ')';
        }
        // Evaluate the expression
        let result = eval(evalExpression);
        if (isNaN(result) || !isFinite(result)) {
            display.innerText = 'Error';
            expression = '';
        } else {
            // Round to 8 decimal places to avoid floating-point precision issues
            result = Math.round(result * 100000000) / 100000000;
            display.innerText = result;
            expression = result.toString();
        }
    } catch (error) {
        display.innerText = 'Error';
        expression = '';
    }
}
