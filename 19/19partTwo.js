const fs = require('fs');
const colors = require('colors');
let input = fs.readFileSync('./19partTwo.txt','utf-8').split('\n\n');
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
// change 11 and 8 rules
rulesGuessObject['8'][1][1] = rulesGuessObject['8'][0][0];
rulesGuessObject['11'][1][1] = rulesGuessObject['11'][0][0];
rulesGuessObject['11'][1].push(rulesGuessObject['11'][0][1]);
let finish = 1;
while(finish != 3 ){    
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
// Associate to each message a sequence of '42' or '31'

let parsedMessages = [];
messages.forEach(message =>{
    let parsed = []
   let temp =  message.match(/.{1,8}/g);
   temp.forEach(five =>{
       rulesDoneObject['42'].forEach(combo =>{
           if(combo === five){
               parsed.push('42');
           }
       })
       rulesDoneObject['31'].forEach(combo =>{
           if(combo == five) {
            parsed.push('31');
           }
       })
   })
   parsedMessages.push(parsed);
})

// Check if the massages are valid
// message has to begin with a 42 rules substring 
// from the first 31 rule it has to have only 31 rule 
// the number of 31 rules has to be 1 ore a multiple of 2
let validParsed =[];
parsedMessages.forEach(message =>{
    let forty = message.indexOf('31');
    let finalPart = message.slice(forty).every(e=>{
        return e === '31'
    })
    let thirty = (message.length - forty);
    let thirtyCheck = null;
    if(thirty ===  1 || (thirty % 2 === 0 )){
        thirtyCheck = true;
    }
    if ( forty >= 2  && finalPart && thirtyCheck ){
        validParsed.push(message);
    }
})

console.log(validParsed.length)
};


console.log('PART TWO: '.rainbow.bold)
decodeRules();

