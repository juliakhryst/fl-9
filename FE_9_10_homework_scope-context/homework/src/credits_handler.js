function userCard(index) {
    let balance = 100;
    let transactionLimit = 100;
    let historyLogs = [];
    let key = index;

    function getCardOptions() {
        return {
            balance,
            transactionLimit,
            historyLogs,
            key
        };
    }

    function putCredits(creditsAmount) {
        balance += creditsAmount; 
        setLog('put', creditsAmount);
    }

    function takeCredits(creditsAmount) {
        if (creditsAmount > transactionLimit || creditsAmount > balance) {
            console.log('You are trying to take more than allowed!\n' + 
            `Your transaction limit is ${transactionLimit} and remaining balance is ${balance}. `);
            return;
        }
        balance -= creditsAmount;
        setLog('take', creditsAmount); 
    }

    function setTransactionLimit(newLimit) {
        transactionLimit = newLimit;
        setLog('limit', newLimit);
    }

    function transferCredits(amount, recepient) {
        const tax = 0.005;
        const total = tax * amount + amount;

        if(total <= balance && total <= transactionLimit) {
            takeCredits(total);
            recepient.putCredits(amount);
        } else {
            console.log('Transaction impossible. Check your balance and transfer limit.');
        }
    }

    function setLog(operationType, credits) {
        let logItem = {
            operationType,
            credits,
            operationTime: new Date().toLocaleString('en-GB')
        };

        switch (operationType) {
            case 'take':
                logItem.operationType = 'Withdrawal of credits';
                break;
            case 'put':
                logItem.operationType = 'Received credits';
                break;
            case 'limit':
                logItem.operationType = 'Transaction limit change';
                break;
            default:
                break;
        }

        historyLogs.push(logItem);
    }

    return {
        getCardOptions,
        putCredits,
        takeCredits,
        setTransactionLimit,
        transferCredits
    };
}

class UserAccount{
    constructor(name){
        this.name = name;
        this.cards = [];
        this.maxCards = 3;
    }

    addCard() {
        if (this.cards.length < this.maxCards) {
            this.cards.push(userCard(this.cards.length + 1));
        } else {
            console.log('You can\'t have more than 3 cards!');
        }
    }

    getCardByKey(key) {
        return this.cards[key-1];
    }
}