import '../styles/styles.css';
import calculator from './interface-module';

const renderCalculator = () => {
  const buttonLabels = {
    clearLabel: 'C',
    equalLabel: '='
  }
  const digitData = 'data-num';
  const containerName = 'calculator';
  const calculatorContainer = document.getElementById(containerName);

  const calcDisplay = calculator.createViewElement('div', 'calculator-display');
  const buttonsContainer = calculator.createViewElement('div', 'buttons-container');
  const actionButtonsPanel = calculator.createViewElement('div', 'action-buttons-panel');
  const digitsPanel = calculator.createViewElement('div', 'digits-panel');

  // Action Buttons
  const clearButton = calculator.createViewButton(buttonLabels.clearLabel, 'btn btn-action btn-clear', () => {
    calculator.clearState();
    calcDisplay.innerHTML = calculator.getResult();
  });

  const equalsButton = calculator.createViewButton(buttonLabels.equalLabel, 'btn btn-action', () => {
    calculator.calculate(calculator.getOperator());

    calcDisplay.innerHTML = calculator.isValueValid(calculator.getResult())
        ? Math.round(calculator.getResult() * 1000000000) / 1000000000
        : calculator.getResult();
  });

  actionButtonsPanel.appendChild(clearButton);
  actionButtonsPanel.appendChild(equalsButton);

  const calcOperators = calculator.operators;
  for (let operator in calcOperators) {
    if (calcOperators.hasOwnProperty(operator)) {
      let operatorButton = calculator.createViewButton(calcOperators[operator], 'btn btn-action', () => {
        operatorButton.setAttribute('data-opr', calcOperators[operator]);
        calculator.setOperator(calcOperators[operator]);
      });
      actionButtonsPanel.appendChild(operatorButton);
    }
  }

  // Digits buttons
  for (let digit = 9; digit >= 0; digit--) {
    const zeroButtonClass = digit === 0 ? 'btn-block' : '';
    const digitButton = calculator.createViewButton(digit, `btn btn-default ${zeroButtonClass}`, () => {
      digitButton.setAttribute(digitData, digit);
      
      if (calculator.getResult()) {
        const newState = {
          n1: parseInt(digitButton.getAttribute(digitData)),
          result: 0
        };
        calculator.updateState(newState);
      } else {
        const newDigit = calculator.getSecondNumber() + digitButton.getAttribute(digitData);
        calculator.updateState({n2: newDigit})
      }

      calcDisplay.innerHTML = calculator.getSecondNumber();
    });

    digitsPanel.appendChild(digitButton);
  }

  calcDisplay.innerHTML = calculator.getResult();
  buttonsContainer.appendChild(digitsPanel);
  buttonsContainer.appendChild(actionButtonsPanel);
  calculatorContainer.appendChild(calcDisplay);
  calculatorContainer.appendChild(buttonsContainer);
}

renderCalculator();