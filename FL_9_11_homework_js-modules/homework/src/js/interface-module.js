import * as math from './calculating-module';

const calculator = (function initInterface() {

  let calcState = {
    n2: 0,
    n1: 0,
    result: 0,
    operator: ''
  };

  const operators = {
    add: '+',
    sub: '-',
    mult: '*',
    divide: '/',
    pow: '^',
    root: '√'
  };

  // Simple getters
  const getSecondNumber = () => parseFloat(calcState.n2);
  const getFirstNumber = () => parseFloat(calcState.n1);
  const getOperator = () => calcState.operator;
  const getResult = () => calcState.result;

  const updateState = (newState) => {
    calcState = Object.assign({}, calcState, newState);
  }

  const clearState = () => {
    calcState = {
      n1: 0,
      n2: 0,
      result: 0,
      operator: ''
    };
  }

  const setOperator = (operator) => {
    updateState({ n1: getSecondNumber(), n2: 0, operator: operator });
  }

  const calculate = (operator) => {
    switch (operator) {
      case operators.add:
        updateState({
          result: math.add(getFirstNumber(), getSecondNumber())
        });
        break;

      case operators.sub:
        updateState({
          result: math.sub(getFirstNumber(), getSecondNumber())
        });
        break;
      
      case operators.mult:
        updateState({
          result: math.mult(getFirstNumber(), getSecondNumber())
        });
        break;

      case operators.divide:
        updateState({
          result: math.divide(getFirstNumber(), getSecondNumber())
        });
        break;
      
      case operators.pow:
        updateState({
          result: math.pow(getFirstNumber(), getSecondNumber())
        });
        break;
      
      case operators.root:
        updateState({
          result: math.root(getFirstNumber(), getSecondNumber())
        });
        break;

      default:
        updateState({
          result: getSecondNumber()
        })
        break;
    }
  }

  const isValueValid = (value) => {
    if (!isFinite(value)) {
      const errorMessage = isNaN(value) ? 'Invalid number' : 'Can\'t divide by 0';
      updateState({ result: errorMessage});
      return false;
    }
  
    return true;
  }

  // Custom functions for DOM elements creation
  const createViewButton = (btnLabel, className, clickCallback) => {
    const button = document.createElement('button');
    button.innerText = btnLabel;
    button.className = className;
    button.addEventListener('click', clickCallback);

    return button;
  }

  const createViewElement = (tagName, className) => {
    const htmlTag = document.createElement(tagName);
    htmlTag.className = className;

    return htmlTag;
  }

  return {
    operators,
    getFirstNumber,
    getSecondNumber,
    getOperator,
    getResult,
    updateState,
    clearState,
    setOperator,
    calculate,
    isValueValid,
    createViewElement,
    createViewButton
  }
}());

export default calculator ;