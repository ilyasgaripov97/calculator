let displayValue;

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

const operationMapping = {
  '+': add,
  '-': subtract,
  '*': multiply,
  '/': divide,
}

function operate(a, b, operator) {
  return operationMapping[operator](a, b);
}

const display = document.querySelector('.display__output');

let currentOperation = {
  a: null,
  b: null,
  operator: null,
}

let typingSecondOperand = false;

function resetCurrentOperation() {
  for (let key in currentOperation) {
    currentOperation[key] = null;
  }
}

function unselectOperators() {
  const operators = document.querySelectorAll('.keys__operator');
  operators.forEach(operator => operator.classList.remove('selected-operator'))
}

function digitPressListener() {
  const digitKeys = document.querySelectorAll('.keys__digit');

  digitKeys.forEach(key => {
    key.addEventListener('click', e => {

      if (typingSecondOperand) {
        clearDisplay()
        typingSecondOperand = false;
      }

      unselectOperators();
      populateDisplay(e.target.value);
    })
  });
}

function operatorPressListener() {
  const operatorKeys = document.querySelectorAll('.keys__operator');

  operatorKeys.forEach(key => {
    key.addEventListener('click', e => {

      if (currentOperation.operator === null) {
        selectOperator(e.target);
        typingSecondOperand = true;
      }

      // fill first operand with display value
      if (currentOperation.a === null) {
        currentOperation.a = parseInt(display.textContent)
      }

    })
  })
}

function equalPressListener() {
  const equalKey = document.querySelector('.keys__equal-operator');

  equalKey.addEventListener('click', e => {
    if (currentOperation.b === null) {
      currentOperation.b = parseInt(display.textContent)
    }
    let result = operate(currentOperation.a, currentOperation.b,currentOperation.operator);
    display.textContent = result.toString();
    resetCurrentOperation();
  })
}

function handleInputs() {
  digitPressListener();
  operatorPressListener();
  equalPressListener();
}

function selectOperator(target) {
  // unselect all selected operators
  unselectOperators();
  // colorize selected operator
  target.classList.add('selected-operator');
  // store inside current operation
  currentOperation.operator = target.value;
}

function clearDisplay() {
  display.textContent = '';
}

function populateDisplay(value) {
  display.textContent += value;
}

handleInputs();
