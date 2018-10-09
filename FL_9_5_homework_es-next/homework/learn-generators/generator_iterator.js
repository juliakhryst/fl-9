function* factorial(n) {
    let value = 1;
    for (let i = 1; i <= n; i++) {
        value *= i;
        yield value;
    }
}

for (var n of factorial(5)) {
    console.log(n)
}