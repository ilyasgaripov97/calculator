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

function resetOperationStatus() {
  for (let key in operationStatus) {
    key = null;
  }
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
      console.log('digit', operationStatus)

      // check if operation is ready to be done
      // append one number to display until operation button were pressed
      const digit = e.target.value;
      displayOutput.textContent += digit;
    })
  })

  operationsKeys.forEach(operation => {
    operation.addEventListener('click', e => {
      displayValue = parseInt(displayOutput.textContent);
      console.log('operator', operationStatus)


      // add first operand to status
      if (operationStatus.firstOperand === null) {
        operationStatus.firstOperand = displayValue

        if (operationStatus.operator === null) {
          operationStatus.operator = e.target.value;
        }
        displayOutput.textContent = '';
      } else {
        operationStatus.secondOperand = displayValue;
        displayOutput.textContent = operate(operationStatus.firstOperand,operationStatus.secondOperand, operationStatus.operator);
        resetOperationStatus();
      }
      // clear display
    })
  })


}

populateDisplay();
