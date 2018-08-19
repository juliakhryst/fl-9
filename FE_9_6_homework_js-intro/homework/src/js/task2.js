// Your code goes here
let aLength = +prompt('Please enter a length:');
let bLength = +prompt('Please enter b length:');
let angle = +prompt('Please enter angle:');
let cLength = Math.sqrt(Math.pow(aLength, 2) + Math.pow(bLength, 2) - 2 * aLength * bLength * Math.cos(angle));
let p = aLength + bLength + cLength;
let square = Math.sqrt(p * (p - aLength) * (p - bLength) * (p - cLength));
let successOutput = `
c length: ${Math.round(cLength) !== cLength ? cLength.toFixed(2) : cLength}
Triangle square: ${Math.round(square) !== square ? square.toFixed(2) : square}
Triangle perimeter: ${Math.round(p) !== p ? p.toFixed(2) : p}
`;
let failedOutput = 'Invalid data';
let isInvalid = aLength <= 0 || bLength <= 0 || cLength <= 0 || p <= 0 || square <= 0;
console.log(isInvalid ? failedOutput : successOutput);
