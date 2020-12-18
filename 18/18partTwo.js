const fs = require('fs');
const colors = require('colors')
const input = fs.readFileSync('./18.txt','utf-8').split('\n');

function solveSimpleExpression(arr){
    let accumulator = 1;
    let temp = arr.map(e=>e)
    // Solve all + operation
    let finish = false;
    while(!finish){ 
    let countPlus = 0;
    for ( let i = 0 ; i < temp.length ; i++){
        if(temp[i] === '+'){
            temp.splice(i-1,3,(parseInt(temp[i-1])+parseInt(temp[i+1])))
            countPlus++;
            break;
        }}
           if(countPlus === 0){
            finish = true;
    }
}

    if(temp.length === 1){
        
        return temp[0];
    }
    // Solve all + operation 
    for (let i = 0 ;i < temp.length ; i++ ){
        if(temp[i] !== '*'){
            accumulator *= temp[i]
        }
    }

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

console.log('PART TWO: '.rainbow.bold)
console.log(partOne(input))