function reverseNumber(n) {
    let minus = -1;
    const reverseNum = parseInt(n.toString().split('').reverse().join(''));
    return Math.sign(n) >= 0 ? reverseNum : minus * reverseNum;
}

