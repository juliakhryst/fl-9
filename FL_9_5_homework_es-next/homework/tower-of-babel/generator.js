const max = process.argv[2];
let FizzBuzz = function* () {
    let cur = 1;
    while (cur <= max) {
        let value = cur;
        cur++;
        if (value % 15 === 0) {
            value = 'FizzBuzz';
        } else if (value % 3 === 0) {
            value = 'Fizz';
        } else if (value % 5 === 0) {
            value = 'Buzz';
        }
        yield value;
    }
}()

for (var n of FizzBuzz) {
    console.log(n);
}