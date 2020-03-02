function eval() {
  // Do not use eval!!!
  return;
}

function expressionCalculator(expr) {
  // write your solution here
  const inputString = expr
    .split(" ")
    .join("")
    .split("");

  const priorityValues = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2
  };

  let numbsValue = "";
  const cashValue = new Array();
  const outputArr = new Array();

  inputString.forEach(el => {
    if (/\d+/gi.test(el)) {
      numbsValue += el;
    } else {
      if (numbsValue.length >= 1) {
        outputArr.push(numbsValue);
        numbsValue = "";
      }
      if (el === "(") {
        cashValue.push(el);
      } else if (el === ")") {
        while (
          cashValue.length !== 0 &&
          cashValue[cashValue.length - 1] !== "("
        )
          outputArr.push(cashValue.pop());

        if (cashValue.length == 0) {
          throw Error("ExpressionError: Brackets must be paired");
        } else {
          cashValue.pop();
        }
      } else {
        while (
          cashValue.length !== 0 &&
          priorityValues[el] <= priorityValues[cashValue[cashValue.length - 1]]
        ) {
          if (cashValue[cashValue.length - 1] == "(")
            throw Error("ExpressionError: Brackets must be paired");
          outputArr.push(cashValue.pop());
        }
        cashValue.push(el);
      }
    }
  });

  if (numbsValue.length >= 1) {
    outputArr.push(numbsValue);
  }

  while (cashValue.length != 0) {
    const inputBrackets = cashValue.pop();
    if (inputBrackets == "(")
      throw Error("ExpressionError: Brackets must be paired");
    outputArr.push(inputBrackets);
  }

  outputArr.forEach(el => {
    if (/\d+/gi.test(el)) {
      cashValue.push(el);
    } else {
      const firstNumber = +cashValue.pop();
      const secondNumber = +cashValue.pop();

      switch (el) {
        case "*":
          cashValue.push(secondNumber * firstNumber);
          break;

        case "/":
          if (firstNumber == 0) throw Error("TypeError: Devision by zero.");
          cashValue.push(secondNumber / firstNumber);
          break;

        case "-":
          cashValue.push(secondNumber - firstNumber);
          break;

        case "+":
          cashValue.push(secondNumber + firstNumber);
          break;

        default:
          break;
      }
    }
  });

  const result = cashValue.pop();

  return result;
}

module.exports = {
  expressionCalculator
};
