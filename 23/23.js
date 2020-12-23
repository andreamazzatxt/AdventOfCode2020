const fs = require('fs');
const colors = require ('colors');
let input = fs.readFileSync('./23.txt','utf-8').split('').map(e=> parseInt(e));
function cupGame(cups){
    let currentCup = {
        index: 0,
        value: cups[0],
    };
    let turns = 1;
    while(turns != 101 ){
        console.log( 'TURN : ' +turns);
        console.log('Cups : '.blue.bold);
        console.log(cups)
        console.log('Current Cup'.red.bold);
        console.log(currentCup);
        // removing three cups handling circular.
        let removedCups = []
      for( let i = 0 ; i < 3 ; i++){
          if (cups[currentCup.index+1]){
              removedCups.push(cups.splice(currentCup.index+1,1));
          }else{
              removedCups.push(cups.splice(0,1))
          }
      }
      removedCups = removedCups.flat();
      console.log('Pick-Up'.green.bold)
      console.log(removedCups);
      //update index of current cap ( in case is changed for removing cups)
      currentCup.index = cups.indexOf(currentCup.value);

      // find Destination cup 
      let foundDest = false;
      let sub = 1;
      let destinationCup = null;
      while(!foundDest){
        if((currentCup.value-sub) > 0){
         if( cups.indexOf(currentCup.value-sub) !== -1 ){
          destinationCup = {
          index :cups.indexOf(currentCup.value-sub),
          value :currentCup.value-sub,
            }   
            foundDest = true;
        }else{
            sub++;
        }
        }else{
            destinationCup ={
                index : cups.indexOf(Math.max(...cups)),
                value : Math.max(...cups),
            }
            foundDest = true;
        }
      }
      console.log('DestinationCup'.yellow.bold);
      console.log(destinationCup)
      // Place removed Cups in the the next clockwise index of destination cup
      if( destinationCup.index +1 === cups.length){
          cups = [...cups,...removedCups];
      }else{
        let indexToInsert = (destinationCup.index+1)
        cups.splice(...[indexToInsert,0].concat(removedCups))
      }
    //update index of current cap ( in case is changed for re adding removed cups)
    currentCup.index = cups.indexOf(currentCup.value);

      
       // Find a new Current Cup
       currentCup = {
           index: (currentCup.index+1)%cups.length,
           value: cups[(currentCup.index+1)%cups.length]
       }


       console.log('=====')
        turns++;
    }
    console.log('FINAL'.rainbow.bold);
    console.log(cups)
    // FIND RESULT 
    let indexOfOne= cups.indexOf(1);
    let firstPart = cups.slice(0,indexOfOne);
    let result = cups.slice(indexOfOne+1).concat(firstPart).join('');
    console.log(result) 

}

cupGame(input);

