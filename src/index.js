function eval(operand1, operand2, operator) {
  // Do not use eval!!!
  return;
}

const operations = {
  "*": (operand1, operand2) => operand1 * operand2,
  "/": (operand1, operand2) => operand1 / operand2,
  "+": (operand1, operand2) => operand1 + operand2,
  "-": (operand1, operand2) => operand1 - operand2
};

function calculate(expr) {
  let expressions = expr.split(" ");

  function calc(operand1, operand2) {
    for (let i = 1; i < expressions.length - 1; i++) {
      if (expressions[i] == operand1 || expressions[i] == operand2) {
        expressions[i] = operations[expressions[i]](
          +expressions[i - 1],
          +expressions[i + 1]
        );
        expressions.splice(i - 1, 3, expressions[i]);
        i--;
      }
    }
  }
  calc("*", "/");
  calc("+", "-");

  return +expressions[0];
}

function checkErrors(expr) {
  let checker = expr
    .split(" ")
    .filter(item => item != "")
    .join("");

  // brackets do not match
  if (
    checker.replace(/[^(]/g, "").length != checker.replace(/[^)]/g, "").length
  ) {
    throw new Error("ExpressionError: Brackets must be paired");
  }

  if (checker.includes("/0")) {
    throw new Error("TypeError: Division by zero.");
  }
}

function expressionCalculator(expr) {
  checkErrors(expr);

  expr = expr.replace(/\s/g, "").replace(/(\*|\/|\+|\-)/g, " $& ");

  if (expr.match(/\(/g) != null) {
    for (let i = expr.match(/\(/g).length; i != 0; i--) {
      let calculation = expr.match(/(\([0-9\+\/\*\-. ]+\))/g)[0];
      let expression = calculation.slice(1, calculation.length - 1);
      expr = expr.replace(calculation, calculate(expression));
    }
  }

  return calculate(expr);
}

module.exports = {
  expressionCalculator
};
