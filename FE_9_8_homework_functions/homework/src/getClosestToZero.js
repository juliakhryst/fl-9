function getClosestToZero() {
    let arg = Array.from(arguments);
    let closestToZero = arg[0];
    for (let i = 1; i < arg.length; i++) {
        if (Math.abs(arg[i]) < Math.abs(closestToZero)) {
            closestToZero = arg[i];
        }
    }
    return closestToZero;
}