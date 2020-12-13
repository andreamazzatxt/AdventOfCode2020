const fs = require('fs');

const input = fs.readFileSync('./13.txt',{encoding: 'utf-8'}).split('\n');

const timeStamp = input[0];
let busesPartOne = input[1].split(',').filter(e => {
    return e !== 'x'
})
let busesPartTwo = input[1].split(',');

console.log(timeStamp);
console.log(busesPartTwo);

// PART ONE
function findFirstBus(timeStamp,buses){
    let firstBus = [0,0]
    buses.forEach(bus => {
        let foundFirst = false;
        let tempTimeStamp = timeStamp;
        while (!foundFirst){
            if(tempTimeStamp % bus === 0 ){
                if(firstBus[0] > tempTimeStamp || firstBus[0] === 0){
                    firstBus = [tempTimeStamp,bus]
                }
               foundFirst = true; 
            }
            tempTimeStamp++;
        }
    });
    console.log((firstBus[0]-timeStamp)*firstBus[1]);
}

console.log('PART ONE:');
findFirstBus(timeStamp,busesPartOne);



// PART TWO

function minimumTimeStamp(busesWithX,buses){
let tempTimeStamp = 0;
let multiplicator = 1;
let pairBusMinutes = buses.map(bus =>{
    return [bus,busesWithX.indexOf(bus)]
});
    for( let i = 0 ; i < pairBusMinutes.length ;i++){
        let exit = false;
        while(!exit){
            if(( tempTimeStamp + parseInt(pairBusMinutes[i][1]) ) % parseInt(pairBusMinutes[i][0]) === 0){
            exit = true;
            multiplicator *= parseInt(pairBusMinutes[i][0]);
            }else{
            tempTimeStamp +=  multiplicator; 
            }
        }

    }
console.log(tempTimeStamp);
}
console.log('PART TWO:');
minimumTimeStamp(busesPartTwo,busesPartOne);