const fs = require('fs');
const colors = require ('colors');
let input = fs.readFileSync('./23.txt','utf-8').split('').map(e=> parseInt(e));

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
    }
   initialize(array){
    let current = this.head;
    array.forEach(cupData =>{
        let newCup = new Cup(cupData);
        current.setNext(newCup);
        let prev = current;
        current = current.next;
        current.setPrevious(prev);
        this.size = this.size +1;
    })
    current.setNext(this.head)
    this.head.setPrevious(current);
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

   delete(value){
       let cupToDelete = this.find(value);
       if( cupToDelete === this.head){
           this.head = this.head.next;
       }
       let prev = cupToDelete.previous;
       let next = cupToDelete.next;
       prev.setNext(next);
       next.setPrevious(prev);
       this.size--
       return cupToDelete.value;
   }
   max(){
    let max = 0;
    let current = this.head;
    for(let i = 0 ;  i < this.size ; i++ ){
        max = current.value > max ? current.value : max;
        current = current.next;
    } 
    return max
   }
   add(destination,cup){
    let destinationCup = this.find(destination)
    let temp = destinationCup.next;
    let newCup = new Cup(cup)
    destinationCup.setNext(newCup);
    newCup.setPrevious(destinationCup);
    temp.setPrevious(newCup);
    newCup.setNext(temp);
    this.size++
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

}

function game(array){
    //initialize Cups class
    let firstCup = new Cup(array[0]);
    let crabCups = new Cups(firstCup);
    crabCups.initialize(array.slice(1)) 
    crabCups.print();
    let current = crabCups.head
    let turns = 1;
    while(turns <= 100 ){
        // Removing...
        let removedCups = [];
        for( let i = 0 ; i < 3 ; i++){
            removedCups.push(crabCups.delete(current.next.value));
          }
        // Find Destination... 
      let foundDest = false;
      let sub = 1;
      let destinationCup = null;
      while(!foundDest){
        if((current.value-sub) > 0){
         if(crabCups.find(current.value-sub) !==  null ){
          destinationCup = crabCups.find(current.value-sub)   
            foundDest = true;
        }else{
            sub++;
        }
        }else{
            destinationCup = crabCups.find(crabCups.max());
            foundDest = true;
        }
      }

    // Place Removed....
     removedCups.forEach(cup=>{
        destinationCup = crabCups.add(destinationCup.value,cup);
     })
       // Find a new Current Cup
       current = current.next;
        turns++
    }

    console.log('FINAL'.rainbow.bold);
    // FIND RESULT 
    console.log(crabCups.partOne());
}
game(input);










