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
  if (b === 0) {
    return 'Division by 0 not allowed';
  }
  return a / b;
}

const display = document.querySelector('.display__output');

function getDisplayData() {
  return parseInt(display.textContent)
}

const operationMapping = {
  '+': add,
  '-': subtract,
  '*': multiply,
  '/': divide,
  '=': getDisplayData,
}

function operate(a, b, operator) {
  return operationMapping[operator](a, b);
}


let operationState = {
  a: null,
  b: null,
  operator: null,
}

let enteringSecondOperand = false;

function isOperationReady() {
  return operationState.a !== null &&  operationState.b !== null && operationState.operator !== null;
}

function processOperation() {
  let result = operate(operationState.a, operationState.b, operationState.operator);
  updateDisplay(result);
  operationState.a = result;
  operationState.b = null;
  operationState.operator = null;
  enteringSecondOperand = true;
  unselectOperators();
}

function unselectOperators() {
  const operators = document.querySelectorAll('.keys__operator');
  operators.forEach(operator => operator.classList.remove('selected-operator'))
}

function digitPressListener() {
  const digitKeys = document.querySelectorAll('.keys__digit');
  let msg = '';

  digitKeys.forEach(key => {
    key.addEventListener('click', e => {
      unselectOperators();

      if (enteringSecondOperand === true) {
        clearDisplay();
        msg = '';
        enteringSecondOperand = false;
      }

      msg += e.target.value;
      updateDisplay(msg);
    })
  });
}

function operatorPressListener() {
  const operatorKeys = document.querySelectorAll('.keys__operator');
  const clearKey = document.querySelector('.keys__clear');

  operatorKeys.forEach(key => {
    key.addEventListener('click', e => {
      const displayValue = parseInt(display.textContent);
      if (operationState.a !== null && operationState.b === null) {
        setOperand('b', displayValue);
      }
      if (operationState.a === null && operationState.b === null) {
        setOperand('a', displayValue);
        enteringSecondOperand = true;
      }
      console.log(operationState)
      if (isOperationReady()) {
        processOperation();
      }
      setOperator(e.target);
    })
  });

  clearKey.addEventListener('click', e => clearState())
}

function setOperator(target) {
  unselectOperators();
  target.classList.add('selected-operator');
  operationState.operator = target.value;
}

function setOperand(prop, value) {
  operationState[prop] = value;
}

function updateDisplay(value) {
  display.textContent = value;
}

function clearDisplay() {
  display.textContent = '';
}

function clearState() {
  operationState.a = null;
  operationState.b = null;
  operationState.operator = null;

  clearDisplay();
}

function handleInputs() {
  digitPressListener();
  operatorPressListener();
}

handleInputs();
