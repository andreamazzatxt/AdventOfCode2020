const fs = require('fs');
let rules = fs.readFileSync('./7.txt','utf-8').split('\n');
rules = rules.map(e => {
    return e.split(" ")
})
let rules2 = `shiny gold bags contain 2 dark red bags.
dark red bags contain 2 dark orange bags.
dark orange bags contain 2 dark yellow bags.
dark yellow bags contain 2 dark green bags.
dark green bags contain 2 dark blue bags.
dark blue bags contain 2 dark violet bags.
dark violet bags contain no other bags.`.split('\n');
rules2 = rules2.map(e => {
    return e.split(" ")
});

let rulesObj = {};

rules.forEach(e => {
    let key = e[0]+e[1];
    let valueObject = {};
    if(e[4] === 'no'){
        valueObject['no'] = true;
    }else{
        for(let i = 4 ; i < e.length - 3; i+= 4){
            let qty = parseInt(e[i]);
            let keyInside  = e[i+1]+e[i+2];
            valueObject[keyInside] = qty;
        }
       
    }
      rulesObj[key] = valueObject;
})
//rulesObj = Object.entries(rulesObj);


function checkGold(rulesObj){
    let goldCounter = 0;
    let golderColor = {shinygold: true}
    let toNotColor = {no: true}
    let tempRules = rulesObj;
    let finish = false;
    while(!finish){
    let toTempRules = []
    tempRules.forEach(rule => {
        let tempRule = rule;
        let temp = Object.entries(rule[1]);
            temp.forEach(e =>{
                if(golderColor[e[0]] === true && !tempRule[2]){
                    goldCounter++;
                    golderColor[rule[0]] = true;
                    tempRule.push(true);
                }else if(e[0] !== 'no' && !tempRule[2] && toNotColor[e[0]] !== true){
                    toTempRules.push(tempRule);
                }
            })
    })
    tempRules = toTempRules;
    console.log(tempRules)
    console.log(goldCounter)
    if(!tempRules || fault === size){
        finish = true;
    }
    }

    console.log(golderColor);
    return goldCounter;
}

function bagContained(rulesObj){
    let unitsObject = {};
    rulesObj = Object.entries(rulesObj);
    let tempRules = [];
    rulesObj.forEach(rule => {
        if(rule[1]['no'] === true){
            unitsObject[rule[0]] = 1;
        }else{
            tempRules.push(rule);
        }
    })
    let finish = false;
    while (!finish){
        let toTempRules = [];
        tempRules.forEach(rule =>{
            let arrRule = Object.entries(rule[1]);
            let size = arrRule.length;
            let check = 0;
            let tempValue = 0;
            arrRule.forEach(e => {
                if(unitsObject[e[0]]){
                    tempValue += unitsObject[e[0]]*e[1] ;
                    check++;
                }
            })
            if(check === size){
                unitsObject[rule[0]] = tempValue+1;
            }else{
                toTempRules.push(rule);
            }
        })
        tempRules = toTempRules;
        console.log(tempRules);
        if(tempRules.length<1){
            finish = true
        }
    }
    
    console.log(unitsObject.shinygold-1)

}


bagContained(rulesObj)