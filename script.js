//// FitzBrendan   Calculator ////

let isFirstOperandDone = false;
let isFirstOperandDecimal = false;
let firstOperandStr = "";
let firstOperandNum = null;

let isSecondOperandDone = false;
let isSecondOperandDecimal = false;
let secondOperandStr = "";
let secondOperandNum = null;

let operator = "";
let operatorStr = "";
let isOperator = false;

let isEquals = false;
let result = 0;
let resultStr = "";

const calculator = document.querySelector("#calc__grid--container");

const clearBtn = document.querySelector(`#clear`);
const allClearBtn = document.querySelector(`#all_clear`);

const padDisplay = document.querySelector(`#pad`);
const resultDisplay = document.querySelector(`#result`);

calculator.addEventListener("click", (e) => {
  if (e.target.classList.contains("number")) {
    numberEntry(e.target.textContent);
  } else if (e.target.id === "decimal") {
    decimalEntry();
  } else if (
    e.target.id === "multiply" ||
    e.target.id === "divide" ||
    e.target.id === "minus" ||
    e.target.id === "plus"
  ) {
    mathEntry(e.target);
  } else if (e.target.id === "percentage") {
    percentageEntry();
  } else if (e.target.id === "equals") {
    equalsEntry();
  }
});

clearBtn.addEventListener("click", clear);
allClearBtn.addEventListener("click", allClear);

function resetFirstOperand() {
  isFirstOperandDone = false;
  isFirstOperandDecimal = false;
  firstOperandStr = "";
  firstOperandNum = null;
}
function resetSecondOperand() {
  isSecondOperandDone = false;
  isSecondOperandDecimal = false;
  secondOperandStr = "";
  secondOperandNum = null;
}
function resetOperator() {
  operator = "";
  operatorStr = "";
  isOperator = false;
}

function clear() {
  if (firstOperandStr.length > 0 && isOperator === false) {
    firstOperandStr = firstOperandNum.toString();
    if (/\.$/.test(firstOperandNum.toString())) {
      isFirstOperandDecimal = false;
    }
    firstOperandStr = firstOperandStr.slice(0, -1);
    if (firstOperandStr.length === 0) {
      firstOperandNum = null;
    } else {
      firstOperandNum = Number(firstOperandStr);
    }
    isFirstOperandDone = false;
  } else if (isOperator === true && secondOperandStr.length === 0) {
    operator = "";
    operatorStr = "";
    isOperator = false;
    isFirstOperandDone = false;
  } else if (secondOperandStr.length > 0) {
    secondOperandStr = secondOperandNum.toString();
    if (/\.$/.test(secondOperandStr)) {
      isSecondOperandDecimal = false;
    }
    secondOperandStr = secondOperandStr.slice(0, -1);
    if (secondOperandStr.length === 0) {
      secondOperandNum = null;
    } else {
      secondOperandNum = Number(secondOperandStr);
    }
    isSecondOperandDone = false;
  }
  displayToPad();
}

function allClear() {
  resetFirstOperand();
  resetSecondOperand();
  resetOperator();
  isEquals = false;
  result = 0;
  displayToPad();
  resultDisplay.textContent = result;
}

function numberEntry(num) {
  if (isEquals === true) {
    allClear();
  }
  if (isSecondOperandDone === false) {
    if (isFirstOperandDone === false) {
      firstOperandStr += num;
      firstOperandNum = Number(firstOperandStr);
    } else if (isFirstOperandDone === true && isOperator === true) {
      secondOperandStr += num;
      secondOperandNum = Number(secondOperandStr);
    }
    if (firstOperandStr.length > 12) {
      firstOperandStr = firstOperandNum.toExponential(2);
      isFirstOperandDone = true;
    } else if (secondOperandStr.length > 12) {
      secondOperandStr = secondOperandNum.toExponential(2);
      isSecondOperandDone = true;
    }
  }
  isEquals = false;
  result = 0;
  displayToPad();
  resultDisplay.textContent = result;
}

function decimalEntry() {
  if (isEquals === true) {
    allClear();
  }
  if (isFirstOperandDecimal === false && isFirstOperandDone === false) {
    firstOperandStr += `.`;
    padDisplay.textContent += `.`;
    isFirstOperandDecimal = true;
  } else if (isSecondOperandDecimal === false && isOperator === true) {
    secondOperandStr += `.`;
    padDisplay.textContent += `.`;
    isSecondOperandDecimal = true;
  }
  isEquals = false;
}

function mathEntry(operation) {
  if (isEquals === true) {
    firstOperandNum = Number(result);
    firstOperandStr = firstOperandNum.toString();
    if (firstOperandStr.length > 12) {
      firstOperandStr = firstOperandNum.toExponential(2);
    }
    isFirstOperandDone = true;
    resetSecondOperand();
    resetOperator();
    result = 0;
    resultDisplay.textContent = result;
  }
  if (secondOperandStr.length === 0 && /\d/.test(firstOperandStr)) {
    switch (operation.id) {
      case "multiply":
        operator = "*";
        operatorStr = operation.textContent;
        break;
      case "divide":
        operator = "/";
        operatorStr = operation.textContent;
        break;
      case "minus":
        operator = "-";
        operatorStr = operation.textContent;
        break;
      case "plus":
        operator = "+";
        operatorStr = operation.textContent;
        break;
      default:
        break;
    }
    isOperator = true;
    isFirstOperandDone = true;
  }
  isEquals = false;
  result = 0;
  displayToPad();
}

function percentageEntry() {
  if (isEquals === true) {
    firstOperandNum = result / 100;
    firstOperandStr = firstOperandNum.toFixed(3);
    isFirstOperandDone = true;
    resetSecondOperand();
    resetOperator();
    result = 0;
    resultDisplay.textContent = result;
  }
  if (isFirstOperandDone === false && /\d/.test(firstOperandStr)) {
    isFirstOperandDone = true;
    isFirstOperandDecimal = true;
    firstOperandNum = firstOperandNum /= 100;
    firstOperandStr = firstOperandNum.toFixed(3);
  } else if (
    isOperator === true &&
    isSecondOperandDone === false &&
    /\d/.test(secondOperandStr)
  ) {
    isSecondOperandDone = true;
    isSecondOperandDecimal = true;
    secondOperandNum /= 100;
    secondOperandStr = secondOperandNum.toFixed(3);
  }
  isEquals = false;
  result = 0;
  displayToPad();
}

function equalsEntry() {
  if (
    (/\./.test(secondOperandStr) && secondOperandStr.length > 1) ||
    (/[^\.]/.test(secondOperandStr) && secondOperandStr > 0)
  ) {
    switch (operator) {
      case "*":
        result = Number((firstOperandNum * secondOperandNum).toFixed(3));
        break;
      case "/":
        result = Number((firstOperandNum / secondOperandNum).toFixed(3));
        break;
      case "-":
        result = Number((firstOperandNum - secondOperandNum).toFixed(3));
        break;
      case "+":
        result = Number((firstOperandNum + secondOperandNum).toFixed(3));
        break;
      default:
        break;
    }
    isEquals = true;
    padDisplay.textContent += ` =`;
    resultStr = result.toString();
    if (resultStr.length > 12) {
      resultStr = result.toExponential(2);
    }
    resultDisplay.textContent = resultStr;
  }
}

function displayToPad() {
  if (firstOperandStr.length > 12) {
    firstOperandStr = firstOperandNum.toExponential(2);
  } else if (secondOperandStr.length > 12) {
    secondOperandStr = secondOperandNum.toExponential(2);
  }
  padDisplay.textContent = `${firstOperandStr} ${operatorStr} ${secondOperandStr}`;
}
