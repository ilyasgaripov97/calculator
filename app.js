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
  console.log(result)
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

function startEnteringSecondOperand(msg) {
  if (enteringSecondOperand === true) {
    clearDisplay();
    msg = '';
    enteringSecondOperand = false;
  }
  return msg;
}

function handleOperatorClick(operator) {
  const displayValue = parseInt(display.textContent);
  if (operationState.a !== null && operationState.b === null) {
    setOperand('b', displayValue);
  }
  if (operationState.a === null && operationState.b === null) {
    setOperand('a', displayValue);
    enteringSecondOperand = true;
  }
  if (isOperationReady()) {
    processOperation();
  }
  setOperator(operator);
  // e.target.classList.add('selected-operator');
}

function undo(msg) {
  let msgArray = msg.split('');
  msgArray.pop();
  msg = msgArray.join('')
  return msg;
}

function digitPressListener() {
  const digitKeys = document.querySelectorAll('.keys__digit');
  const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const operators = [...Object.keys(operationMapping)];

  let msg = '';

  document.addEventListener('keydown', e => {
    msg = startEnteringSecondOperand(msg);
    if (digits.includes(e.key)) {
      msg += e.key.toString();
      updateDisplay(msg)
    }
    if (e.code == 'Backspace') {
      msg = undo(msg);
      updateDisplay(msg)
    }
    if (operators.includes(e.key)) {
      handleOperatorClick(e.key);
    }
  })

  digitKeys.forEach(key => {
    key.addEventListener('click', e => {
      unselectOperators();
      msg = startEnteringSecondOperand(msg);
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
      handleOperatorClick(e.target.value);
    })
  });

  clearKey.addEventListener('click', e => clearState())
}

function setOperator(value) {
  unselectOperators();
  operationState.operator = value;
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
