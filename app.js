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

function populateDisplay() {
  const displayOutput = document.querySelector('.display__output');
  const digitKeys = document.querySelectorAll('.keys__digit');

  digitKeys.forEach(key => {
    key.addEventListener('click', e => {
      const digit = e.target.value;
      displayOutput.textContent = digit;
      displayValue = digit;
    })
  })
}

populateDisplay();
