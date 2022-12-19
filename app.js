const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const allClearButton = document.querySelector('[data-ac]')
const plusMinusButton = document.querySelector('[data-plus-minus]')
const percentButton = document.querySelector('[data-percent]')

const outputBox = document.querySelector('.output')
const previousOperand = outputBox.querySelector('[data-previous-operand]')
const currentOperation = outputBox.querySelector('[data-current-operation]')
const currentOperand = outputBox.querySelector('[data-current-operand]')

const appendNumber = number => {
	if(previousOperand.innerText === '0' && parseFloat(number) === 0) return
	if(currentOperand.innerText === '0' && parseFloat(number) === 0) return
	if(previousOperand.innerText === '0' && parseFloat(number) > 0 && currentOperand.innerText === '' && currentOperation.innerText === '') previousOperand.innerText = ''
	if(number === '.' && currentOperand.innerText.includes('.')) number = ''
	if(number === '.' && previousOperand.innerText.includes('.') && currentOperation.innerText === '') number = ''
	if(currentOperation.innerText === '')
		previousOperand.innerText += number
	else
		currentOperand.innerText += number
}

const clear = () => {
	previousOperand.innerText = '0'
	currentOperand.innerText = ''
	currentOperation.innerText = ''
}

const appendOperation = operation => {
	if(currentOperation.innerText != '') return
	currentOperation.innerText = operation
}

const compute = (previousOperand, currentOperation, currentOperand) => {
	let a = parseFloat(previousOperand.innerText)
	let b = parseFloat(currentOperand.innerText)
	let op = currentOperation.innerText
	let c
	switch(op) {
		case '+' :
			c = a + b
			break
		case '-' :
			c = a - b
			break
		case '*' :
			c = a * b
			break
		case '/' :
			c = a / b
			break
	}
	if(c%1 > 0) c = c.toPrecision(4)
	return c
}

const equals = () => {
	if(currentOperation.innerText != '' && currentOperand.innerText != '') {
		let a = compute(previousOperand, currentOperation, currentOperand).toString()
		clear()
		previousOperand.innerText = a
	}
}

numberButtons.forEach(numberButton => {
	numberButton.addEventListener('click', e => {
		appendNumber(e.target.innerText)
	})
})

operationButtons.forEach(operationButton => {
	operationButton.addEventListener('click', e => {
		appendOperation(e.target.innerText)
	})
})

equalsButton.addEventListener('click', () => equals())

allClearButton.addEventListener('click', () => clear())

plusMinusButton.addEventListener('click', () => {
	let n = parseFloat(previousOperand.innerText) * (-1)
	previousOperand.innerText = n.toString()
})

percentButton.addEventListener('click', () => {
	let p = parseFloat(previousOperand.innerText) / 100
	previousOperand.innerText = p.toString()
})

window.addEventListener('keydown', e => {
	if(e.key === 'Enter') equals()
	if(e.key === 'Backspace') clear()
	
	if(e.key === '0') appendNumber(e.key)
	if(e.key === '.') appendNumber(e.key)
	if(e.key === '1') appendNumber(e.key)
	if(e.key === '2') appendNumber(e.key)
	if(e.key === '3') appendNumber(e.key)
	if(e.key === '4') appendNumber(e.key)
	if(e.key === '5') appendNumber(e.key)
	if(e.key === '6') appendNumber(e.key)
	if(e.key === '7') appendNumber(e.key)
	if(e.key === '8') appendNumber(e.key)
	if(e.key === '9') appendNumber(e.key)

	if(e.key === '+') {
		 appendOperation(e.key)
		 e.preventDefault()
	}
	if(e.key === '-') appendOperation(e.key)
	if(e.key === '*') appendOperation(e.key)
	if(e.key === '/') appendOperation(e.key)
	if(e.key === '%') {
		let p = parseFloat(previousOperand.innerText) / 100
		previousOperand.innerText = p.toString()
	}
	if(e.key === 'a' && e.ctrlKey === true) e.preventDefault()
})