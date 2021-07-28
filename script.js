const clearButton = document.querySelector('[data-type="clear"]'); 
const clearEntryButton = document.querySelector('[data-type="clearEntry"]')
const displayButtons = document.querySelectorAll('[data-type="number"]');
const operateButtons = document.querySelectorAll('[data-type="operator"]');
const evaluateButton = document.querySelector('[data-type="evaluate"]');
const display = document.getElementById("display");

let operator = null; 
let adding = false; 
let subtracting = false;
let modulating = false;  
let multiplying = false; 
let dividing = false; 

let newValue; 
let numLength; 
let operandOne; 
let operandTwo;
let operatorOne; 
let operatorTwo; 
let operatorTemp;  
let result; 

clearButton.addEventListener("click", function() {
    display.textContent = null;
    completeReset(); 
}); 

clearEntryButton.addEventListener("click", removeValue);

evaluateButton.addEventListener("click", () => {
    if (!operatorOne) operatorOne = display.textContent; 
    setStatus(operatorOne);
    evaluateValues();
    completeReset(); // here - round answers and debug for mistakes
});

displayButtons.forEach(button => {
    button.addEventListener("click", function() { appendValue(button) });
});

operateButtons.forEach(button => {
    button.addEventListener("click", function() {
        if (operatorOne) {
            operatorTwo = button.textContent; 
        } else {
            operatorOne = button.textContent; 
        }
        setStatus(operatorOne);
        assignValues();
        cleanStatus();  
    });
});

function completeReset() {
    operandOne = null;
    operandTwo = null; 
    operatorOne = null; 
    operatorTwo = null; 
    resetOperations();
}

function cleanStatus() {
    if (operatorTwo) operatorOne = operatorTwo; 
    if (operandTwo) operandOne = display.textContent; 
    operandTwo = null;
    operatorTwo = null;  
    resetOperations();
}

function setStatus(operator) {
    switch (operator) {
            case "+":
                adding = true;  
                break; 
            case "-": 
                subtracting = true; 
                break;
            case "x":
                multiplying = true; 
                break; 
            case "/":
                dividing = true; 
                break; 
            case "%": 
                modulating = true; 
        }
}

function assignValues() {
    if (operandOne) {
       operandTwo = Number(display.textContent); 
       result = operateValues(operandOne, operandTwo);
       console.log(result);
       if (!isNaN(result)) result = checkDecimals(result); 
       display.textContent = result; 
    } else {
       operandOne = Number(display.textContent);
       display.textContent = null;
    }
    console.log(operandOne);
    console.log(operandTwo);
} 

function evaluateValues() { // here 
    outer: 
    if (operandOne) {
        if (!display.textContent) {
            display.textContent = "Error!";
            break outer; 
        }
        operandTwo = Number(display.textContent); 
        result = operateValues(operandOne, operandTwo); 
        if (!isNaN(result)) result = checkDecimals(result); 
        display.textContent = result;
    } else { 
        display.textContent = "Error!";
    } 
}

function checkDecimals(num) {
    numLength = num 
        .toString()
        .split("."); 
    if (numLength[1] > 3) { 
        return num.toFixed(3); 
    } else { 
        return num;
    }
}
function appendValue(button) {
    if (display.textContent.includes(".") && button.textContent == ".") { 
        display.textContent = display.textContent;
    } else if (newValue) { // ensures that textContent is not appended to calculated value
        display.textContent = button.textContent; 
        newValue = null;
    } else if (display.textContent == 0 || isNaN(display.textContent) && display.textContent != ".") {
        display.textContent = button.textContent; 
    } else {
        display.textContent += button.textContent; 
    }
}

function removeValue() { 
    display.textContent = display.textContent.slice(0, -1);
}

function operateValues(a, b) {
    if (adding) {
        newValue = operate(add, a, b); 
        return newValue; 
    } else if (subtracting) {
        newValue = operate(subtract, a, b); 
        return newValue; 
        console.log("Subtracting");
    } else if (multiplying) {
        newValue = operate(multiply, a, b);
        return newValue;  
        console.log("multiplying"); 
    } else if (dividing) {
        if (b == 0) { 
            return "No."; 
        } else { 
            newValue = operate(divide, a, b);
            return newValue; 
        }
    } else if (modulating) {
        newValue = operate(modulo, a, b); 
        return newValue;
    }
}

function resetOperands() {
    operandOne = result; 
    operandTwo = null;
}

function resetOperations() {
    adding = false; 
    subtracting = false;
    multiplying = false; 
    dividing = false;  
    modulating = false; 
}

function operate(operator, a, b) {
    let operated = operator(a,b);
    return operated;  
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a,b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function modulo(a, b) {
    return a % b; 
}