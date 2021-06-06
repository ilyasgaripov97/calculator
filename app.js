let displayValue = 0;

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

const operationStatus = {
  firstOperand: null,
  operator: null,
  secondOperand: null,
}

function doOperation() {
}

function isOperationReady() {
  return operationStatus.firstOperand && operationStatus.operator && operationStatus.secondOperand
}

function populateDisplay() {
  const displayOutput = document.querySelector('.display__output');
  const digitKeys = document.querySelectorAll('.keys__digit');
  const operationsKeys = document.querySelectorAll('.keys__operation');

  digitKeys.forEach(key => {
    key.addEventListener('click', e => {
      if (operationStatus.firstOperand !== null && operationStatus.operator !== null) {
        displayOutput.textContent = '';
      }

      const digit = e.target.value;
      displayOutput.textContent += digit;
    })
  })

  operationsKeys.forEach(operation => {
    operation.addEventListener('click', e => {
      // if operator was pressed, means that we have full number
      displayValue = parseInt(displayOutput.textContent);
      console.log(displayValue)

      // check if operation is ready to be done, it happen when we fill two operands and operator
      if (isOperationReady()) {
        operate(operationStatus.firstOperand, operationStatus.secondOperand, operationStatus.secondOperand);
      }

      // check status of the first operand if it is not empty, try to fill second operand
      // if it is also not empty,
      if (operationStatus.firstOperand === null) {
        operationStatus.firstOperand = displayValue;
        displayValue = 0;
      }
      if (operationStatus.operator === null) {
        operationStatus.operator = e.target.value;
      }
      else if (operationStatus.secondOperand === null) {
        operationStatus.secondOperand = displayValue;
      }
      console.log(operationStatus);

    })
  })


}

populateDisplay();
