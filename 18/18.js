const fs = require('fs');
const colors = require('colors')
const input = fs.readFileSync('./18.txt','utf-8').split('\n');

function solveSimpleExpression(arr){
    let accumulator = null;
    let operand = null;
    arr.forEach(char =>{
        switch(char){
            case '+':
                    operand = char;
                break;
            case '*':
                    operand = char;
                break;
            default:
                if(!accumulator){
                    accumulator = parseInt(char);
                }else {
                    if (operand === '+'){
                        accumulator = accumulator + parseInt(char);
                    }else if ( operand === '*'){
                        accumulator = accumulator * parseInt(char);
                    }
                    operand = null;
                }
                break;
        }
    })
    return accumulator;
}
function solveComplex(array){
    let sum = 0;
    let stackOpen = null;
    let finish = false;
    while (!finish){
        let countBraces = 0;
    for (let i = 0 ; i < array.length ; i++){
        if( array[i] === '('){
            stackOpen = i;
            countBraces++;
        }else if (array[i] === ')'){
            let startIndex = stackOpen;
            let arrayToSolve = array.slice(startIndex+1,i);
            let result = solveSimpleExpression(arrayToSolve);
            array.splice(startIndex,(i-startIndex+1),result);
            break;
        }
   }
   if (countBraces === 0){
       finish = true;
   }
   sum = solveSimpleExpression(array);
}
return sum;
}
function partOne(arrayExpressions){
    let sum = 0
    arrayExpressions.forEach(expression => {
        // remove blank spaces and generate an array for each expression 
        let array = expression.split('').filter(char =>{
            return char !== ' ';
        })
        sum += solveComplex(array);
    });

    return sum;
}

console.log('PART ONE: '.rainbow.bold)
console.log(partOne(input))