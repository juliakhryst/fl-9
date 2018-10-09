const max = process.argv[2];
let FizzBuzz = {
    [Symbol.iterator]() {
        let cur = 1;
        return {
            next() {
                if (cur % 3 === 0) {
                    cur = 'Fizz';
                }
                if (cur % 5 === 0) {
                    cur = 'Buzz';
                }
                if (cur % 3 === 0 && cur % 5 === 0) {
                    cur = 'FizzBuzz';
                }
                if (cur < max) return { done: false, value: cur };
                return { done: true };
            }
        }
    }
}

for (var n of FizzBuzz) {
    console.log(n);
}