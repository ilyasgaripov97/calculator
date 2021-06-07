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
      if (currentOperation.a !== null) clearDisplay();

      unselectOperators();
      populateDisplay(e.target.value);

    })
  });
}

function operatorPressListener() {
  const operatorKeys = document.querySelectorAll('.keys__operator');

  operatorKeys.forEach(key => {
    key.addEventListener('click', e => {
      if (currentOperation.operator === null) selectOperator(e.target);

      // fill first operand with display value
      if (currentOperation.a === null) {
        currentOperation.a = parseInt(display.textContent)
      } else if (currentOperation.b === null) {
        currentOperation.b = parseInt(display.textContent)
      }

      // if user click = sign, call operate
      if (e.target.value === '=') {
        let result = operate(currentOperation.a, currentOperation.b,currentOperation.operator);
        console.log(currentOperation, result);
        display.textContent = result.toString();
        resetCurrentOperation();
      }
    })
  })
}

function handleInputs() {
  digitPressListener();
  operatorPressListener();
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
