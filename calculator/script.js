const display = document.getElementById('display');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalButton = document.getElementById('equal');
const clearButton = document.getElementById('clear');
const decimalButton = document.querySelector('.decimal');

let currentInput = '0';
let firstOperand = null;
let secondOperand = null;
let currentOperator = null;
let shouldResetScreen = false;

function updateScreen() {
    display.value = currentInput;
}

function appendNumber(number) {
    if (currentInput === '0' || shouldResetScreen) {
        currentInput = number;
        shouldResetScreen = false;
    } else {
        currentInput += number;
    }
}

function chooseOperator(operator) {
    if (currentOperator !== null) calculate();
    firstOperand = currentInput;
    currentOperator = operator;
    shouldResetScreen = true;
}

function calculate() {
    secondOperand = currentInput;
    switch (currentOperator) {
        case '+':
            currentInput = (parseFloat(firstOperand) + parseFloat(secondOperand)).toString();
            break;
        case '-':
            currentInput = (parseFloat(firstOperand) - parseFloat(secondOperand)).toString();
            break;
        case '*':
            currentInput = (parseFloat(firstOperand) * parseFloat(secondOperand)).toString();
            break;
        case '/':
            if (secondOperand === '0') {
                alert("Cannot divide by zero");
                resetCalculator();
                return;
            }
            currentInput = (parseFloat(firstOperand) / parseFloat(secondOperand)).toString();
            break;
        default:
            return;
    }
    currentOperator = null;
    shouldResetScreen = true;
}

function resetCalculator() {
    currentInput = '0';
    firstOperand = null;
    secondOperand = null;
    currentOperator = null;
    shouldResetScreen = false;
}

function appendDecimal() {
    if (shouldResetScreen) {
        currentInput = '0';
        shouldResetScreen = false;
    }
    if (!currentInput.includes('.')) {
        currentInput += '.';
    }
}

numberButtons.forEach(button =>
    button.addEventListener('click', () => {
        appendNumber(button.dataset.number);
        updateScreen();
    })
);

operatorButtons.forEach(button =>
    button.addEventListener('click', () => {
        chooseOperator(button.dataset.operator);
        updateScreen();
    })
);

equalButton.addEventListener('click', () => {
    calculate();
    updateScreen();
});

clearButton.addEventListener('click', () => {
    resetCalculator();
    updateScreen();
});

decimalButton.addEventListener('click', () => {
    appendDecimal();
    updateScreen();
});
