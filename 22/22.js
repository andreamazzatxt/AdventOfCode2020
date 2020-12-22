const fs = require('fs');
const colors = require ('colors');
let input = fs.readFileSync('./22.txt','utf-8').split('\n\n');
let playerOne = input[0].split('\n').slice(1);
playerOne = playerOne.map(num =>{
    return parseInt(num);
})
let playerTwo = input[1].split('\n').slice(1);
playerTwo =playerTwo.map(num =>{
    return parseInt(num);
})
function combat(deckOne,deckTwo){
    deckOne = deckOne.slice(0);
    deckTwo = deckTwo.slice(0);
    let round = 0;
    let finish = false
    let winner = null;
    while(!finish){
        round++;
        let sideOne = deckOne.shift();
        let sideTwo = deckTwo.shift();
        if(sideOne > sideTwo){
            deckOne.push(sideOne);
            deckOne.push(sideTwo);
        }else if( sideTwo > sideOne){
            deckTwo.push(sideTwo);
            deckTwo.push(sideOne);
        };

        if( deckOne.length === 0){
            finish = true;
            console.log('Player two wins!')
            winner = deckTwo.slice();
        }else if ( deckTwo.length === 0){
            finish = true;
            console.log('Player one wins!')
            winner = deckOne.slice();
        }
    }
    // Calculate the ponits of the winner 
    winner.reverse();
    let points = 0;
    winner.forEach((card,index)=>{
        points += (card*(index+1))
    })
    console.log(points)
}
console.log('PART ONE: (no recursion)'.rainbow.bold)
combat(playerOne,playerTwo);

function checkMemoryGame(memory,deckOne,deckTwo){
    let checkDeckOne = false;
    memory.deckOne.forEach(memoryDeck=>{
        if(memoryDeck.join('') === deckOne.join(''))
        checkDeckOne = true;
    })
    let checkDeckTwo = false;
    memory.deckTwo.forEach(memoryDeck =>{
        if(memoryDeck.join('') === deckTwo.join('')){
            checkDeckTwo = true;
        }
    })
    if(checkDeckOne || checkDeckTwo){
        return true;
    }else{
        return false;
    }
}
function RecursiveCombat(deckOne,deckTwo){
    deckOne = deckOne.slice(0);
    deckTwo = deckTwo.slice(0);
    let memoryGame = {
        deckOne: [],
        deckTwo: [],
    }
    let round = 0;
    let finish = false
    let winner = null;
    while(!finish){
        round++;
        if(!checkMemoryGame(memoryGame,deckOne,deckTwo)){
            memoryGame.deckOne.push(deckOne.slice());
            memoryGame.deckTwo.push(deckTwo.slice());
        let sideOne = deckOne.shift();
        let sideTwo = deckTwo.shift();
        if(deckOne.length >= sideOne && deckTwo.length >= sideTwo){

            let roundWinner  = RecursiveCombat(deckOne.slice(0,sideOne),deckTwo.slice(0,sideTwo));
            if(roundWinner[0] === 'one') {
                deckOne.push(sideOne);
                deckOne.push(sideTwo);
            }else if ( roundWinner[0] === 'two'){
                deckTwo.push(sideTwo);
                deckTwo.push(sideOne);
            }
        }else{
            if(sideOne > sideTwo){
            deckOne.push(sideOne);
            deckOne.push(sideTwo);
        }else if( sideTwo > sideOne){
            deckTwo.push(sideTwo);
            deckTwo.push(sideOne);
        };
        if( deckOne.length === 0){
            finish = true;
            winner = ['two',deckTwo.slice()];
        }else if ( deckTwo.length === 0){
            finish = true;
            winner = ['one',deckOne.slice()];
        }}
    }else{
        winner = ['one',deckOne.slice()]
        finish = true;
    }
    } 
    return (winner)
}
// this part take about 30 seconds to calculate the winner
console.log('PART TWO (with recursion take some time to calclulate winner...)'.rainbow.bold)
 let recursiveWinner = RecursiveCombat(playerOne,playerTwo)
recursiveWinner[1].reverse();
let points = 0;
recursiveWinner[1].forEach((card,index)=>{
    points += (card*(index+1))
})
console.log('Player ' + recursiveWinner[0] + ' wins!')
console.log(points) 


