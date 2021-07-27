const displayButtons = document.querySelectorAll('[data-type="number"]');
const operateButtons = document.querySelectorAll('[data-type="operator"]');
const evaluateButton = document.querySelector('[data-type="evaluate"]');
const display = document.getElementById("display");

let operator = null; 
let adding = false; 
let subtracting = false; 
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

evaluateButton.addEventListener("click", () => {
    if (!operatorOne) operatorOne = display.textContent; 
    setStatus(operatorOne);
    // heck
    evaluateValues();
    completeReset(); // here - round answers and debug for mistakes
});

displayButtons.forEach(button => {
    button.addEventListener("click", () => appendValue(button));
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
            case "÷":
                dividing = true; 
        }
}

function assignValues() {
    if (operandOne) {
       operandTwo = Number(display.textContent); 
       result = operateValues(operandOne, operandTwo);
       result = checkDecimals(result); 
       display.textContent = result; 
    } else {
       operandOne = Number(display.textContent);
       display.textContent = null;
    }
    console.log(operandOne);
    console.log(operandTwo);
} 

function evaluateValues() { // here 
    if (!operandTwo && operatorOne) {
        display.textContent = "Error!";
        console.log("One");
    } else if (operandOne) {
       operandTwo = Number(display.textContent); 
       result = operateValues(operandOne, operandTwo);
       result = checkDecimals(result); 
       display.textContent = result;
       console.log("Two");
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
    if (newValue) { // ensures that textContent is not appended to calculated value
        display.textContent = button.textContent; 
        newValue = null;
    } else if (display.textContent == 0 || typeof(display.textContent) == "string") {
        display.textContent = button.textContent; 
    } else {
        display.textContent += button.textContent; 
    }
}

function operateValues(a, b) {
    if (adding) {
        newValue = operate(add, a, b); 
        return newValue; 
        console.log("Adding"); // here 
    } else if (subtracting) {
        newValue = operate(subtract, a, b); 
        return newValue; 
        console.log("Subtracting");
    } else if (multiplying) {
        newValue = operate(multiply, a, b);
        return newValue;  
        console.log("multiplying"); 
    } else if (dividing) {
        newValue = operate(divide, a, b);
        return newValue; 
    }
    // resetOperations(); 
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
