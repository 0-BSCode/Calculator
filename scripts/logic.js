const container = document.querySelector("div.calculator");
const display = document.querySelector("div.display");
const numBtns = document.querySelectorAll("[data-num]");
const operatorBtns = document.querySelectorAll("[data-operator]")
const clearBtn = document.querySelector("[data-clear]");
const delBtn = document.querySelector("[data-del]");
const decimalBtn = document.querySelector("[data-decimal]");
const equalBtn = document.querySelector("[data-equals]");

let firstTerm;
let secondTerm;
let firstOperation = null;
let result;
let shouldClearScreen = false;
let shouldReset = false;

numBtns.forEach((btn) => {
    btn.addEventListener("click", ()=>appendNum(btn));
}) 

operatorBtns.forEach((btn) => {
    btn.addEventListener("click", ()=>appendOperator(btn));
}) 

clearBtn.addEventListener("click", ()=>{
    shouldReset = true;
    clearScreen()});

delBtn.addEventListener("click", ()=>deleteNumber());
decimalBtn.addEventListener("click", ()=>appendDecimal());
equalBtn.addEventListener("click", ()=>evaluate());

function createCalculator(){
    for (let i=0; i<16; i++){
        const newBtn = document.createElement("button");
        newBtn.textContent = i;
        newBtn.addEventListener("click", ()=>{
            if (newBtn.textContent == 0){
                display.textContent = "";
            } else if (newBtn.textContent == 1){
                display.textContent = display.textContent.slice(0,-1);
            } else {
                display.textContent += newBtn.textContent
            }
        })
        newBtn.classList.add("btn");
        container.appendChild(newBtn);
    }
}

function clearScreen(){
    display.textContent = "";
    shouldAppendDecimal = true;
    shouldClearScreen = false;
    if (shouldReset){
        firstTerm = "";
        secondTerm = "";
        firstOperation = null;
        shouldReset = false;
    }
}

function appendNum(elem){
    if (shouldClearScreen) clearScreen();
    display.textContent += elem.textContent;
}

function deleteNumber(){
    if (display.textContent.slice(-1) === "."){
        shouldAppendDecimal = true;
    }
    display.textContent = display.textContent.slice(0,-1);
}

function appendOperator(elem) {
    if (firstOperation != null) {
        evaluate();
    }
    firstOperation = elem.textContent;
    firstTerm = parseFloat(display.textContent);
    shouldClearScreen = true;
}

function appendDecimal(){
    if (!((display.textContent.includes(".")) || (display.textContent == ""))){
        display.textContent += ".";
    }
}

function evaluate() {
    secondTerm = parseFloat(display.textContent);
    if ((secondTerm === 0) && firstOperation === "/") {
        display.textContent = "ERR";
        shouldClearScreen = true;
        return;
    }
    let result = operate(firstOperation, firstTerm, secondTerm)
    display.textContent = roundOff(result);
    firstOperation = null;
}

function operate(operation, a ,b) {
    switch (operation){
        case "+":
            return a+b;
        case "-":
            return a-b;
        case "/":
            return a/b;
        case "*":
            return a*b;
    }
}

function roundOff(num) {
    return Math.round((num + Number.EPSILON) * 10000) / 10000;
}

// createCalculator();