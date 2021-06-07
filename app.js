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

function digitPressListener() {
  const digitKeys = document.querySelectorAll('.keys__digit');

  digitKeys.forEach(key => {
    key.addEventListener('click', e => {
      populateDisplay(e.target.value);
    })
  });
}

function operatorPressListener() {
  const operatorKeys = document.querySelectorAll('.keys__operator');

  operatorKeys.forEach(key => {
    key.addEventListener('click', e => {
      selectOperator(e.target);
    })
  })
}

function handleInputs() {
  digitPressListener();
  operatorPressListener();
}

function unselectOperators() {
  const operators = document.querySelectorAll('.keys__operator');
  operators.forEach(operator => operator.classList.remove('selected-operator'))
}

function selectOperator(target) {
  // unselect all selected operators
  unselectOperators();
  // colorize selected operator
  target.classList.add('selected-operator');
  // store inside current operation
  currentOperation.operator = target.value;
}

function populateDisplay(value) {
  display.textContent += value;
  currentOperation.a = parseInt(display.textContent );
}

handleInputs();
