let isPlay = confirm('Do you want to play a game?');
const maxAtempts = 3;

if (!isPlay) {
    alert('You did not become a millionaire, but can');
} else {
    while (isPlay) {
        let max = 5;
        let maxAttemptPrize = 10;
        let attemptPrize = maxAttemptPrize;
        let totalWin = 0;
        let attempts = maxAtempts;

        while (isPlay && attempts > 0) {
            let randomNumber = Math.round(Math.random() * max);
            console.log(randomNumber);

            let userNumber = prompt(
                `Enter a number from 0 to ${max} :
Attempts left: ${attempts} 
Total prize: ${totalWin} $ 
Possible prize on current attempt : ${attemptPrize} $
      `);

            if (!userNumber) {
                break;
            }

            if (+userNumber === randomNumber) {
                totalWin = totalWin + attemptPrize;
                attempts = maxAtempts;
                isPlay = confirm(`Congratulation! Your prize is: ${totalWin} $. Do you want to continue?`);

                if (!isPlay) {
                    break;
                } else {
                    max = max * 2;
                    maxAttemptPrize = maxAttemptPrize * 3;
                    attemptPrize = maxAttemptPrize;
                }

            } else {
                attempts--;
                attemptPrize = Math.floor(attemptPrize / 2);
            }
        }

        isPlay = confirm(`Thank you for a game. Your prize is: ${totalWin} $. Do you want to play again?`);
    }

}
