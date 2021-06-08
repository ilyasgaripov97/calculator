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

let enteringSecondOperand = false;

function isOperationReady() {
  return operationState.a && operationState.b && operationState.operator;
}

function processOperation() {
  // call operate on operation state
  let result = operate(operationState.a, operationState.b, operationState.operator);

  // update display with result
  updateDisplay(result);

  // make result to be first operand of next operation (change operation state)
  operationState.a = result;

  // make second operand of operation state to be null
  operationState.b = null;

  // make operator of operation state to be null
  operationState.operator = null;

  // set entering second operand to be true
  enteringSecondOperand = true;

  // unselect operators in gui
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

  operatorKeys.forEach(key => {
    key.addEventListener('click', e => {
      // get current display value
      let displayValue = parseInt(display.textContent);

      // set operand 2 if not set yet
      if (operationState.a !== null && operationState.b === null) {
        setOperand('b', displayValue);
      }
      // set operand 1 if not set yet
      if (operationState.a === null && operationState.b === null) {
        setOperand('a', displayValue);
        enteringSecondOperand = true;
      }
      // if operation is ready then process it
      if (isOperationReady()) {
        console.log(operationState)
        processOperation();
      }
      // if operation is not ready then set operator
      if (!isOperationReady()) {
        setOperator(e.target);
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

function updateDisplay(value) {
  display.textContent = value;
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
