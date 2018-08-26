function getMin() {
    let arg = Array.from(arguments);
    let min = arg[0];
    for (let i = 1; i < arg.length; i++) {
        if (arg[i] < min) {
            min = arg[i];
        }
    }
    return min;
}