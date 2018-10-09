import MathModule from './modules_default_export_math';

var arg1 = process.argv[2];
var arg2 = process.argv[3];

console.log(MathModule.PI);
console.log(MathModule.sqrt(+arg1));
console.log(MathModule.square(+arg2))