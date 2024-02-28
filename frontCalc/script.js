class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.operation = undefined;
        this.currentOperand = '';
        this.previousOperand = '';
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNum(num) {
        if(num === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + num.toString();
    }

    chooseOperation(operation) {
        if(this.currentOperand === '') return;
        if(this.previousOperand !=='') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '÷':
                computation = prev / current;
                break;
            case '×':
                computation = prev * current;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';

    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigit = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if(isNaN(integerDigit)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigit.toLocaleString('en', {
                maximumFractionDigits: 0,
            })
        }
        if(decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerHTML = this.getDisplayNumber(this.currentOperand);
        if(this.operation != null) {
            this.previousOperandTextElement.innerHTML = `${this.previousOperand} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerHTML = '';
        }
    }
}


const numberButtons = document.querySelectorAll('[data-number]');
const equalButton = document.querySelector('[data-equal]');
const operationButtons = document.querySelectorAll('[data-operation]');
const clearButton = document.querySelector('[data-clear]');
const deleteButton = document.querySelector('[data-delete]');
const dataPrevious = document.querySelector('[data-previous]');
const dataCurrent = document.querySelector('[data-current]');



const calculator = new Calculator(dataPrevious, dataCurrent);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNum(button.innerHTML);
        calculator.updateDisplay();
    });
});


operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerHTML);
        calculator.updateDisplay();
    });
});

equalButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
});

clearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});