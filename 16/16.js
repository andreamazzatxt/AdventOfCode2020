const fs = require('fs');
const input = fs.readFileSync('./16.txt','utf-8').split('\n\n');
let rules = input[0].split('\n').map(e => {
    return e.split(': ')[1]
});
//Object with the key value pair
let rulesObject = {}
input[0].split('\n').map(e => {return e.split(': ')}).forEach(e =>{
    rulesObject[e[0]] = e[1].split(' or ').map(e=>{return e.split('-')})
});
//splitted rules without first part needed for the firs part:
let splittedRules = rules.map(e => e.split(' or ')).flat().map(e=> e.split('-'));
const myTicket = input[1].slice(13).split(',');
const nearbyTickets = input[2].slice(16).split('\n').map(e => e.split(','));

// PART ONE
function partOne(tickets,rules){
    let invalid = [];
    tickets.forEach(ticket => {
        ticket.forEach(number =>{
            let count = 0; 
            rules.forEach(rule => {
                if(parseInt(rule[0])<= parseInt(number) && parseInt(rule[1])>=parseInt(number)){
                    count++;
                }
            })
            if(count === 0){
                invalid.push(parseInt(number));
            }
        })
    });
   
    let result = invalid.reduce((acc,curr) =>{
       return parseInt(acc) + parseInt(curr)
   })
     console.log('PART ONE: ' +result)
};

// PART TWO

function partTwo(tickets,rules,rulesObject){
    let valid = [];  // array to store valid tickets
    tickets.forEach(ticket => {
        let checkValid = true;
        ticket.forEach(number =>{
            let count = 0; 
            rules.forEach(rule => {
                if(parseInt(rule[0])<= parseInt(number) && parseInt(rule[1])>=parseInt(number)){
                    count++;
                }
            })
            if(count === 0 ){
                checkValid = false
            }
        })
            if(checkValid){
                valid.push(ticket);
            }        
    });
    // Make an object with each element in the same position in each ticket
    let positionObject = {}
    valid.forEach((ticket) => {
        ticket.forEach((element,index) => {
            if(!positionObject[index]){
                positionObject[index] = [];
            }   
        positionObject[index].push(parseInt(element));
        })
    })
   // Compare each position with the rules object and assign each rule
  
    let resultObject = {}
        for(key in rulesObject){   
   
            for(position in positionObject){
              let count = 0;   
            positionObject[position].forEach(element =>{
            if(parseInt(rulesObject[key][0][0]) <= element && parseInt(rulesObject[key][0][1]) >= element){
                count++;

            }else if(parseInt(rulesObject[key][1][0]) <= element && parseInt(rulesObject[key][1][1]) >= element){
                count++;
            }
            })
            // if every position satisfy the rule, assign that rule to the position 
            if(count === valid.length){
                if(!resultObject[key]){
                    resultObject[key] = []
                }
                resultObject[key].push(parseInt(position))
            }
            }
        }
        // clean every possible combination starting with the rules thats does have ony one possible position.
        let condition = false
        while(!condition){

        let countCleaned = 0;
        for ( key in resultObject){
            if(resultObject[key].length === 1){
                countCleaned++;
                for(innerKey in resultObject){
                    resultObject[innerKey].forEach((pos,index) =>{
                        if (resultObject[key][0] === pos && innerKey !== key){
                            resultObject[innerKey].splice(index,1)
                        }
                    })
                }
            }
        }

         if(countCleaned === Object.keys(resultObject).length){
            condition = true;
        }  
        }
        // find rules that starts with departure and make an array of position check in "your ticket"
        let arrPosToCheck = [];
        for( key in resultObject){
            if(key.substring(0,9) === 'departure'){
                arrPosToCheck.push(resultObject[key][0])
            }
        }
        let result = 1;
        arrPosToCheck.forEach(position => {
            result *= parseInt(myTicket[position])
        })
        console.log('PART TWO: ' + result)

};


partOne(nearbyTickets,splittedRules)
partTwo(nearbyTickets,splittedRules,rulesObject)