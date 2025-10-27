const display = document.querySelector('.display');
const buttonsContainer = document.querySelector('.buttons');

// Calculator state
let state = {
  currentValue: '0',
  previousValue: '',
  operator: ''
};

// one single event listener on the buttons container (event delegation)
buttonsContainer.addEventListener('click', (e) => {
  // Make sure we clicked a button
  if (!e.target.matches('button')) return;
  
  const { action, value } = e.target.dataset;
  
  // choose the right operatior
  switch(action) {
    case 'number':
      handleNumber(value);
      break;
    case 'operator':
      handleOperator(value);
      break;
    case 'equals':
      calculate();
      break;
    case 'clear':
      clear();
      break;
    case 'delete':
      deleteLastDigit();
      break;
  }
});

function handleNumber(num) {
  if (state.currentValue === '0') {
    state.currentValue = num;
  } else {
    state.currentValue += num;
  }
  updateDisplay();
}

function handleOperator(op) {
  // If there's already an operation pending, calculate it first
  if (state.operator && state.previousValue !== '') {
    calculate();
  }
  
  state.previousValue = state.currentValue;
  state.currentValue = '0';
  state.operator = op;
}

function calculate() {
  if (!state.operator || state.previousValue === '') return;
  
  const prev = parseFloat(state.previousValue);
  const current = parseFloat(state.currentValue);
  let result;
  
  switch(state.operator) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '/':
      result = current !== 0 ? prev / current : 'Error';
      break;
    default:
      return;
  }
  
  state.currentValue = result.toString();
  state.previousValue = '';
  state.operator = '';
  updateDisplay();
}

function clear() {
  state.currentValue = '0';
  state.previousValue = '';
  state.operator = '';
  updateDisplay();
}

function deleteLastDigit() {
  if (state.currentValue.length > 1) {
    state.currentValue = state.currentValue.slice(0, -1);
  } else {
    state.currentValue = '0';
  }
  updateDisplay();
}

function updateDisplay() {
  display.textContent = state.currentValue;
}