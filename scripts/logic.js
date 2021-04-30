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
let operator = null;
let result;
let shouldClearScreen = true;
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
window.addEventListener("keydown", (e)=>{
    const btn = evaluateKey(e.key);
    btn.click();
})
display.textContent = "0";

function clearScreen(){
    display.textContent = "";
    shouldAppendDecimal = true;
    shouldClearScreen = false;
    if (shouldReset){
        firstTerm = "";
        secondTerm = "";
        operator = null;
        shouldReset = false;
        display.textContent = "0";
    }
}

function appendNum(elem){
    if (shouldClearScreen || display.textContent === "0") clearScreen();
    display.textContent += elem.textContent;
}

function deleteNumber(){
    if (display.textContent.slice(-1) === "."){
        shouldAppendDecimal = true;
    }
    display.textContent = display.textContent.slice(0,-1);
}

function appendOperator(elem) {
    if (operator != null) {
        evaluate();
    }
    operator = elem.textContent;
    firstTerm = parseFloat(display.textContent);
    if (Number.isNaN(firstTerm)) return;
    shouldClearScreen = true;
}

function appendDecimal(){
    if (shouldClearScreen) clearScreen();
    if (!((display.textContent.includes(".")) || (display.textContent == ""))){
        display.textContent += ".";
    }
}

function evaluate() {
    secondTerm = parseFloat(display.textContent);
    if (secondTerm === 0 && operator === "/") {
        display.textContent = "ERR";
        shouldClearScreen = true;
        return;
    }
    if (operator == null) return;
    let result = operate(operator, firstTerm, secondTerm)
    display.textContent = roundOff(result);
    operator = null;
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

function evaluateKey(key){
    const nums = "0123456789";
    const operations = "+-/*";
    let btnSelected;
    if (nums.includes(key)){
        btnSelected = document.querySelector(`[data-num="${key}"]`);
    } else if (operations.includes(key)){
        btnSelected = document.querySelector(`[data-operator="${key}"]`);
    } else if (key === "Enter"){
        btnSelected = document.querySelector("[data-equals]");
    } else if (key === "Backspace") {
        btnSelected = document.querySelector("[data-del]");
    } else if (key === ".") {
        btnSelected = document.querySelector("[data-decimal]");
    } else {
        return;
    }
    return btnSelected;
}
