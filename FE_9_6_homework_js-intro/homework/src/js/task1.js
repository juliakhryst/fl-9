// Your code goes here
let price = +prompt('Please enter the price:');
let discount = +prompt('Please enter the discount:');
let savings = price * (discount / 100);
let newPrice = price - savings;

let successOutput = `
Price without discount: ${price} 
Discount: ${discount}
Price with discount: ${Math.round(newPrice) !== newPrice ? newPrice.toFixed(2) : newPrice}
Saved: ${Math.round(savings) !== savings ? savings.toFixed(2) : savings}
`;
let failedOutput = 'Invalid data';
console.log(price < 0 || discount < 0 || discount > 100 ? failedOutput : successOutput);
