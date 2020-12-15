const fs = require('fs');

let input = fs.readFileSync('./15.txt','utf-8').split(',').map(n => {
    return parseInt(n);
});


function play(array,loops,part){
    let turn = 1;
    let spokenNumber = new Map();
    let nextNumber = null;
    array.forEach((number) => {
        spokenNumber.set(number,turn)
        nextNumber = number;
        turn++;
    });
    turn--;
    nextNumber = 0;
    while(turn < loops-1){
        turn++;
        // IF LAST NUMBER WAS FIRST SPOKEN
        if(!spokenNumber.has(nextNumber)){
            let temp = nextNumber;
            nextNumber = 0;
            spokenNumber.set(temp,turn)
        }else{
        // IF LAST NUMBER WAS NOT FIRST SPOKEN
        let temp = nextNumber;
            nextNumber = turn - spokenNumber.get(nextNumber);
            spokenNumber.set(temp,turn)
        }
    }

   console.log(part + nextNumber);
}
// PART TWO NEEDS APROX [6,23s user 0,20s system 96% cpu 6,684 total]  
//TO GIVE THE RESULT (DEPENDING OF HW)

play(input,2020,'PART ONE: ')
play(input,30000000,'PART TWO: ')


