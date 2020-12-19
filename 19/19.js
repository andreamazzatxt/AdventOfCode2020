const fs = require('fs');
const colors = require('colors');
let input = fs.readFileSync('./19.txt','utf-8').split('\n\n');
let rulesGuessObject = new Object;// object with key value pair of rules that has to be translated
let rulesDoneObject = new Object; // object with key that has a fix value ( or pair of values);
input[0].split('\n').forEach(line => {
    let key = line.split(": ")[0];
    let value = line.split(": ")[1];
    if(value[1].includes(`a`) || value[1].includes('b')){
        rulesDoneObject[key] = [value[1]];
    }else{
       let temp =  value.split(' ');
       if (temp.includes('|')){
            let first = value.split(' | ')[0].split(' ');
            let second = value.split(' | ')[1].split(' ');
            rulesGuessObject[key] = [first,second];
       }else{
           let unique = value.split(' ');
               rulesGuessObject[key] = [unique];

       }
    }
});
let messages = input[1].split('\n');
function decodeRules(){
let finish = 1;
while(finish != 0 ){    

    for(rule in rulesGuessObject){
        rulesGuessObject[rule].forEach((chance,indexChance) => {
           if(chance.length === 2){
                if(rulesDoneObject[chance[0]] && rulesDoneObject[chance[1]]){
                let temporaryArray = new Array ;
                rulesDoneObject[chance[0]].forEach(alternativeX => {
                    rulesDoneObject[chance[1]].forEach(alternativeY => {
                        temporaryArray.push(alternativeX+alternativeY);
                    })
                })
                rulesGuessObject[rule][indexChance] = temporaryArray;
            }}else if (chance.length === 1){
                if(rulesDoneObject[chance[0]]){
                    let temporaryArray = new Array;
                    rulesDoneObject[chance[0]].forEach(alternative =>{
                        temporaryArray.push(alternative);
                    })
                    rulesGuessObject[rule][indexChance] = temporaryArray;
                }
            }else if ( chance.length === 3){
                if(rulesDoneObject[chance[0]] && rulesDoneObject[chance[1]] && rulesDoneObject[chance[2]]){
                    let temporaryArray = new Array;
                rulesDoneObject[chance[0]].forEach(x =>{
                    rulesDoneObject[chance[1]].forEach(y =>{
                        rulesDoneObject[chance[2]].forEach(z => {
                            temporaryArray.push(x+y+z);
                        })
                    })
                })
                rulesGuessObject[rule][indexChance] = temporaryArray;
            }
            }
        })
    }

    for(rule in rulesGuessObject){
        let temp = rulesGuessObject[rule].map( e=>e);
        temp = temp.flat().join('')
        temp = temp.split('')
        let counter = 0;
        temp.forEach(char=> {
            if( char === 'a' || char === 'b'){
                counter++
            }
        })
        if( counter === temp.length){
            rulesDoneObject[rule] = rulesGuessObject[rule].flat();
            delete rulesGuessObject[rule]
        }
    }
    finish = 0;
    for(rule in rulesGuessObject){
        finish++;
    }  

}

   let validCount = 0;
   messages.forEach(message => {
    rulesDoneObject['0'].forEach(rule => {
        if(message === rule){
            validCount++
        }
    })
   })
return validCount;
};

console.log('PART ONE: '.rainbow.bold)
console.log(decodeRules());
