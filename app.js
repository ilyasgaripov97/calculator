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

function populateDisplay(value) {
  const displayOutput = document.querySelector('.display__output');
  const digitKeys = document.querySelectorAll('.keys__digit');

  digitKeys.forEach(key => {
    key.addEventListener('click', e => {
      const digit = e.target.value;
      displayOutput.textContent += digit;
      displayValue = parseInt(displayOutput.textContent);
    })
  })
}

const currentOperation = {
  firstOperand: null,
  secondOperand: null,
  operator: null,
}

function doOperation() {
  const displayOutput = document.querySelector('.display__output');
  // decl variable for operator
  let operator = null;

  const operationKeys = document.querySelectorAll('.keys__operation');
  operationKeys.forEach(key => {
    key.addEventListener('click', e => {
      // if first operand not filled, fill it with current display value
      // else if second operand is not filled, fill it with display value
      if (currentOperation.firstOperand === null) {
        currentOperation.firstOperand = displayValue;
      } else if (currentOperation.secondOperand === null) {
        currentOperation.secondOperand =displayValue
      }
      // when user clicks operation key, change operator state inside current operation
      operator = e.target.value;
      currentOperation.operator = operator;

      // if all current operation is ready, call operate function on it
      if (currentOperation.firstOperand !== null && currentOperation.secondOperand !== null && currentOperation.operator !== null) {
        console.log(operate(currentOperation.firstOperand, currentOperation.secondOperand, currentOperation.operator));
      }
      // clear display and display value
      displayValue = null;
      displayOutput.textContent = '';
    })
  })

}

populateDisplay();
doOperation();
