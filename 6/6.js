const fs = require('fs');
let answersByGroup = fs.readFileSync('./6.txt','utf-8')
const batchArr = answersByGroup.split('\n\n');
const batch = batchArr.map(group =>{
    return group.split('\n')
})

function checkAnswers(arr){
    let totYes = 0;
    arr.forEach(element => {
        let store = {};
        let toBeCounted = element.length;
        element.forEach(person =>{
            let arrayfy = person.split("");
            arrayfy.forEach(answer =>{
                if(!store[answer]){
                    store[answer] = 1;
                }else{
                    store[answer]++;
                }
            })
            })
            console.log(store);
            Object.entries(store).forEach(e => {

                if(e[1] === toBeCounted){
                    totYes ++;
                }
        })
    });
    return totYes;
}

console.log(checkAnswers(batch));