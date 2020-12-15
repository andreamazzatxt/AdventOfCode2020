const fs = require('fs');
const passwords = fs.readFileSync('./2.txt','utf-8').split('\n');

function checkPassword(passList){
    let countOK = 0;
    passList.forEach(e => {
    let arr = e.split(" ")
    let range = arr[0].split("-"); // array range [start,end];
    let letter = arr[1].split(":");
    let password = arr[2].split("");
    let countLetter = 0;
    password.forEach(e => {
        if(e === letter[0]){
            countLetter++
        }
    })
    if(countLetter >= range[0] && countLetter <= range[1]){
        countOK++;
    }

});
console.log('PART ONE ' + countOK);
};

function checkPasswordStepTwo(passList){
    let countOk = 0;
    passList.forEach(e => {
    let arr = e.split(" ")
    let positions = arr[0].split("-"); // array positions [start,end];
    let letter = arr[1].split(":");
    let password = arr[2].split("");
    let checkpos1 = password[positions[0]-1] === letter[0];
    let checkpos2 = password[positions[1]-1] === letter[0];
    if( checkpos1 || checkpos2){
        if( !checkpos1 || !checkpos2) {
        countOk++;
        }
        
    }
    

});
console.log('PART TWO: '+countOk);
}


checkPassword(passwords);
checkPasswordStepTwo(passwords)