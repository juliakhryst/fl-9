function isPrime(n) {
    const three = 3;
    const two = 2;

    if (n <= 1) {
        return false;
    }

    if (n === three) {
        return true;
    }

    if (n % two === 0) {
        return n === two;
    }

    let root = Math.ceil(Math.sqrt(n));
    for (let i = 3; i <= root; i += two) {
        if (n % i === 0) {
            return false;
        }
    }
    return true;
}