const fs = require('fs');
const colors = require ('colors');
let input = fs.readFileSync('./23.txt','utf-8').split('').map(e=> parseInt(e));

for ( let i = Math.max(...input)+1 ; i <= 1000000 ; i++){
    input.push(i);
} 

class Cup {
    constructor(value){
        this.value = value;
        this.next = null;
        this.previous = null;
    }
    setNext(nextCup){
        this.next = nextCup;
    }
    setPrevious(previousCup){
        this.previous = previousCup;
    }
}
class Cups {
    constructor(head){
        this.head = head;
        this.size = 1;
        this.maxCup = 1000000;
        this.cupMapping = new Map();
    }
   initialize(array){
    let current = this.head;

    array.forEach(cupData =>{
         this.cupMapping.set(current.value, current);
        let newCup = new Cup(cupData);
        current.setNext(newCup);
        let prev = current;
        current = current.next;
        current.setPrevious(prev);
        this.size = this.size +1;

    })
    current.setNext(this.head)
    this.head.setPrevious(current);
    this.cupMapping.set(current.value, current);
    //this.max();
   }
   print(){
       let current = this.head;
       for(let i = 0 ;  i < this.size ; i++ ){
           console.log(current.value + '<-->');
           current = current.next;
       }
       console.log(current.value + '...')
   }
   find(value){
       let current = this.head
    for(let i = 0 ;  i < this.size ; i++ ){
       if(current.value === value){
         return current;
       }else{
           current = current.next
       }
    }
    return null;
   }

   delete(cupToDelete){
       if( cupToDelete === this.head){
           this.head = this.head.next;
       }
       let prev = cupToDelete.previous;
       let next = cupToDelete.next;
       prev.setNext(next);
       next.setPrevious(prev);
       this.size--
       this.cupMapping.delete(cupToDelete.value);
       return cupToDelete.value;
   }
   add(destinationCup,cup){
    let temp = destinationCup.next;
    let newCup = new Cup(cup)
    destinationCup.setNext(newCup);
    newCup.setPrevious(destinationCup);
    temp.setPrevious(newCup);
    newCup.setNext(temp);
    this.size++
    this.cupMapping.set(newCup.value,newCup)
    return newCup
   }
   partOne(){
       let result = '';
       let current = this.find(1).next;
       for(let i = 0 ;  i < this.size-1 ; i++ ){
           result+= current.value;
           current = current.next;
       }
       return result
   }
   partTwo(){
       let one = this.cupMapping.get(1);
        let first = one.next;
        let second = first.next;
        console.log('First : ' + first.value);
        console.log('Second : ' +second.value)
        return (first.value*second.value)
   }
}
function game(array){
    //initialize Cups class
    let firstCup = new Cup(array[0]);
    let crabCups = new Cups(firstCup);
    crabCups.initialize(array.slice(1)) 
    let current = crabCups.head
    let turns = 1;
    while(turns <= 10000000   ){
        if( turns% 1000000 === 0){
            console.log('Processing Turn -' + turns)
        }
/*         console.log('Turn: ' +turns)
        console.log('Current : '.green.bold + current.value)
        crabCups.print(); */
        // Removing...
        let removedCups = [];
        for( let i = 0 ; i < 3 ; i++){
            let removed = crabCups.delete(current.next);
            removedCups.push(removed);
          }
/* 
          console.log('Removing : '.red.bold + removedCups) */
        // Find Destination... 
      let foundDest = false;
      let objective = current.value;
      let destinationCup = null;
      while(!foundDest){
         objective--;
        if(objective <= 0 ){
            objective = crabCups.maxCup+1;
        } else if(!removedCups.includes(objective)){
            destinationCup = crabCups.cupMapping.get(objective);
            foundDest = true;
        }
      }
/*       console.log('Destination : '.blue.bold + destinationCup.value)
      console.log('--------') */
    // Place Removed....
     removedCups.forEach(cup=>{
        destinationCup = crabCups.add(destinationCup,cup);
     })
       // Find a new Current Cup
       current = current.next;
        turns++
    }

    console.log('PART TWO : '.rainbow.bold);
    // FIND RESULT 
    console.log(crabCups.partTwo());
}
game(input);
