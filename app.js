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

let currentOperation = {
  a: null,
  b: null,
  operator: null,
}

function populateDisplay() {
  const displayOutput = document.querySelector('.display__output');
  const digitKeys = document.querySelectorAll('.keys__digit');

  digitKeys.forEach(key => {
    key.addEventListener('click', e => {
      if (currentOperation.b === null) {
        displayOutput.textContent = ''
      }
      const digit = e.target.value;
      displayOutput.textContent += digit;
    })
  })
}

function isOperationReady(operation) {
  return operation.a && operation.b && operation.operator;
}

function doOperation() {
  const displayOutput = document.querySelector('.display__output');
  let operator = null;


  // create an operation object to fill

  const operationKeys = document.querySelectorAll('.keys__operation');
  operationKeys.forEach(key => {
    key.addEventListener('click', e => {

      // parse value from display
      displayValue = parseInt(displayOutput.textContent);

      // store operator into variable
      operator = e.target.value;
      if (currentOperation.operator === null) currentOperation.operator = operator;

      // fill first or second operand
      if (currentOperation.a === null) {
        currentOperation.a = displayValue;
      } else if (currentOperation.b === null) {
        currentOperation.b = displayValue;
      }

      console.log(currentOperation)
      // check if operation is ready
      if (isOperationReady(currentOperation) !== null) {
        displayValue = operate(currentOperation.a, currentOperation.b, currentOperation.operator)
        displayOutput.textContent = displayValue;

        currentOperation.a = displayValue;
        currentOperation.b = null;
      }

      // call operate(displayValue, ?, operator)
      // displayOutput.textContent = operate(displayValue, 1,operator);

      // clear display
    })
  })

}

populateDisplay();
doOperation();
