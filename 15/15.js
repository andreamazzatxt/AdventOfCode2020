const fs = require('fs');

let input = fs.readFileSync('./15.txt', {encoding : 'utf-8'}).split(',').map(n => {
    return parseInt(n);
});

// PART ONE 

function play(array,loops,part){
    let turn = 1;
    let sayedNumber = {};
    let lastNumber = null;
    array.forEach((number) => {
        sayedNumber[number] = {
            lastSeen: turn,
            beforeSeen: null
        }
        lastNumber = number;
        turn++;
    });
    while(turn <= loops){
        // IF LAST NUMBER NOT ALREADY IN THE LIST 
        if(sayedNumber[lastNumber].beforeSeen === null){
            lastNumber = 0;
            if(!sayedNumber[lastNumber]){
                sayedNumber[lastNumber] = {
                    lastSeen: turn,
                    beforeSeen: null,
                }
                
            }else{
                sayedNumber[0].beforeSeen = sayedNumber[0].lastSeen;
                sayedNumber[0].lastSeen = turn; 
            }
        // IF LAST NUMBER ALREADY IN THE LIST
        }else{
            lastNumber = sayedNumber[lastNumber].lastSeen - sayedNumber[lastNumber].beforeSeen;
            if(!sayedNumber[lastNumber]){
                sayedNumber[lastNumber] = {
                    lastSeen : turn,
                    beforeSeen : null,
                }
            }else{
                sayedNumber[lastNumber].beforeSeen = sayedNumber[lastNumber].lastSeen;
                sayedNumber[lastNumber].lastSeen = turn;
            }
        }
        turn++;

    }

   console.log(part + lastNumber);
}
// PART TWO NEEDS APROX 500 seconds TO GIVE THE RESULT 
play(input,2020,'PART ONE: ')
play(input,30000000,'PART TWO: ')


