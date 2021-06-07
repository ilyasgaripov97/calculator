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

let operationState = {
  a: null,
  b: null,
  operator: null,
}

function unselectOperators() {
  const operators = document.querySelectorAll('.keys__operator');
  operators.forEach(operator => operator.classList.remove('selected-operator'))
}

function digitPressListener() {
  const digitKeys = document.querySelectorAll('.keys__digit');

  digitKeys.forEach(key => {
    key.addEventListener('click', e => {
      unselectOperators();
      populateDisplay(e.target.value);
    })
  });
}

function operatorPressListener() {
  const operatorKeys = document.querySelectorAll('.keys__operator');

  operatorKeys.forEach(key => {
    key.addEventListener('click', e => {

      setOperator(e.target);

      if (operationState.b === null && operationState.a !== null) {
        setOperand('b', parseInt(display.textContent))
      }
      if (operationState.a === null && operationState.b === null) {
        setOperand('a', parseInt(display.textContent));
      }

    })
  })
}

function equalPressListener() {
  const equalKey = document.querySelector('.keys__equal-operator');

  equalKey.addEventListener('click', e => {

  })
}

function setOperator(target) {
  unselectOperators();
  target.classList.add('selected-operator');
  operationState.operator = target.value;
}

function setOperand(prop, value) {
  operationState[prop] = value;
}

function populateDisplay(value) {
  display.textContent += value;
}

function clearDisplay() {
  display.textContent = '';
}

function handleInputs() {
  digitPressListener();
  operatorPressListener();
  equalPressListener();
}

handleInputs();
