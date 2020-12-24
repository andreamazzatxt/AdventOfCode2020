const colors = require('colors');
const fs = require('fs');
let input = fs.readFileSync('./24.txt','utf-8').split('\n');

input  = input.map(line => {
    line = line.split('');
    let temp = []
    for (let i = 0 ; i < line.length ; i++ ){
        if(line [i] === 's' || line[i] === 'n'){
            temp.push(line[i]+line[i+1])
            i++
        }else{
            temp.push(line[i]);
        }
    }
    return temp

})
// FALSE === WHITE TRUE === BLACK
class Tile {
    constructor(a,b,c,d,e,f){
        this.color = false;
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.e = e;
        this.f = f;
        this.id = [...a,...b,...c,...d,...e,...f].join('');
    }
    flip(){
        this.color = !this.color;
        return this.color;
    }

}

class Floor{
    constructor(){
        this.mainTile = null;

        this.black = 0;
        this.memory = new Map()
    }
 
    initialize(){
        let newTile = new Tile([0,1],[1,0],[2,0],[3,1],[2,2],[1,2]);
        this.memory.set(newTile.id,newTile);
        this.expandGrid(newTile)
        this.mainTile = newTile;
    }
       // Visit all the tiles to reach the destination and flip the destintion tile 
    visitTile(instructions){
        instructions.forEach(instruction =>{
           let currentTile = this.mainTile; 
            instruction.forEach(coord => {
                        let tempId = []
                        switch(coord){
                            case 'e':
                                tempId = [[currentTile.a[0],currentTile.a[1]+2]   ,   [currentTile.a[0]+1,currentTile.a[1]+1]   ,  [currentTile.a[0]+2,currentTile.a[1]+1]   ,  [currentTile.a[0]+3,currentTile.a[1]+2]   ,   [currentTile.a[0]+2,currentTile.a[1]+3]   ,   [currentTile.a[0]+1,currentTile.a[1]+3]];
                                break;
                            case 'se':
                                tempId = [[currentTile.a[0]-2,currentTile.a[1]+1]   ,   [currentTile.a[0]-1,currentTile.a[1]]   ,  [currentTile.a[0],currentTile.a[1]]   ,  [currentTile.a[0]+1,currentTile.a[1]+1]   ,   [currentTile.a[0],currentTile.a[1]+2]   ,   [currentTile.a[0]-1,currentTile.a[1]+2]];
                                break;
                            case 'sw':
                                tempId = [ [currentTile.a[0]-2,currentTile.a[1]-1]   ,    [currentTile.a[0]-1,currentTile.a[1]-2]    ,    [currentTile.a[0],currentTile.a[1]-2] ,   [currentTile.a[0] + 1,currentTile.a[1] -1]   ,   [currentTile.a[0],currentTile.a[1]]   ,   [currentTile.a[0]-1,currentTile.a[1]]]
                                break;
                            case 'w':
                                tempId = [ [currentTile.a[0],currentTile.a[1]-2] , [currentTile.a[0]+1,currentTile.a[1]-3] , [currentTile.a[0]+2,currentTile.a[1]-3] , [currentTile.a[0]+3,currentTile.a[1]-2] , [currentTile.a[0]+2,currentTile.a[1]-1] , [currentTile.a[0]+1,currentTile.a[1]-1]]
                                break;
                            case 'nw':
                                tempId = [ [currentTile.a[0]+2,currentTile.a[1]-1]   ,   [currentTile.a[0]+3,currentTile.a[1]-2]   ,   [currentTile.a[0]+4,currentTile.a[1]-2]   ,   [currentTile.a[0]+5,currentTile.a[1]-1]   ,   [currentTile.a[0]+4,currentTile.a[1]]   ,   [currentTile.a[0]+3,currentTile.a[1]]]
                                break;
                            case 'ne':
                                tempId = [  [currentTile.a[0] +2 , currentTile.a[1] +1]   ,   [currentTile.a[0] +3, currentTile.a[1]]   ,   [currentTile.a[0] + 4 , currentTile.a[1]]    ,   [currentTile.a[0] +5 , currentTile.a[1] +1]    ,   [currentTile.a[0] +4 , currentTile.a[1] +2 ]    ,   [currentTile.a[0] +3 , currentTile.a[1] + 2]  ]
                                break;
                        }
                        if (!this.memory.has(tempId.flat().join(''))){
                            let tempTile = new Tile(...tempId);
                            this.memory.set(tempTile.id,tempTile);
                            this.expandGrid(tempTile)
                            currentTile = tempTile
                        }else{
                           currentTile = this.memory.get(tempId.flat().join(''));
                        }
                       
                    });
            currentTile.flip(); 
        })
    }

    getAdiacents(currentTile){
        let adiacents = [];
            adiacents.push([[currentTile.a[0],currentTile.a[1]+2]   ,   [currentTile.a[0]+1,currentTile.a[1]+1]   ,  [currentTile.a[0]+2,currentTile.a[1]+1]   ,  [currentTile.a[0]+3,currentTile.a[1]+2]   ,   [currentTile.a[0]+2,currentTile.a[1]+3]   ,   [currentTile.a[0]+1,currentTile.a[1]+3]]);
            adiacents.push([[currentTile.a[0]-2,currentTile.a[1]+1]   ,   [currentTile.a[0]-1,currentTile.a[1]]   ,  [currentTile.a[0],currentTile.a[1]]   ,  [currentTile.a[0]+1,currentTile.a[1]+1]   ,   [currentTile.a[0],currentTile.a[1]+2]   ,   [currentTile.a[0]-1,currentTile.a[1]+2]]);
            adiacents.push([[currentTile.a[0]-2,currentTile.a[1]-1]   ,    [currentTile.a[0]-1,currentTile.a[1]-2]    ,    [currentTile.a[0],currentTile.a[1]-2] ,   [currentTile.a[0] + 1,currentTile.a[1] -1]   ,   [currentTile.a[0],currentTile.a[1]]   ,   [currentTile.a[0]-1,currentTile.a[1]]]);
            adiacents.push([[currentTile.a[0],currentTile.a[1]-2] , [currentTile.a[0]+1,currentTile.a[1]-3] , [currentTile.a[0]+2,currentTile.a[1]-3] , [currentTile.a[0]+3,currentTile.a[1]-2] , [currentTile.a[0]+2,currentTile.a[1]-1] , [currentTile.a[0]+1,currentTile.a[1]-1]]);
            adiacents.push([[currentTile.a[0]+2,currentTile.a[1]-1]   ,   [currentTile.a[0]+3,currentTile.a[1]-2]   ,   [currentTile.a[0]+4,currentTile.a[1]-2]   ,   [currentTile.a[0]+5,currentTile.a[1]-1]   ,   [currentTile.a[0]+4,currentTile.a[1]]   ,   [currentTile.a[0]+3,currentTile.a[1]]]);
            adiacents.push([[currentTile.a[0] +2 , currentTile.a[1] +1]   ,   [currentTile.a[0] +3, currentTile.a[1]]   ,   [currentTile.a[0] + 4 , currentTile.a[1]]    ,   [currentTile.a[0] +5 , currentTile.a[1] +1]    ,   [currentTile.a[0] +4 , currentTile.a[1] +2 ]    ,   [currentTile.a[0] +3 , currentTile.a[1] + 2]])
            return adiacents;
    }
    expandGrid(currentTile){  

        let tempId = [[currentTile.a[0],currentTile.a[1]+2]   ,   [currentTile.a[0]+1,currentTile.a[1]+1]   ,  [currentTile.a[0]+2,currentTile.a[1]+1]   ,  [currentTile.a[0]+3,currentTile.a[1]+2]   ,   [currentTile.a[0]+2,currentTile.a[1]+3]   ,   [currentTile.a[0]+1,currentTile.a[1]+3]];
        if(!this.memory.has(tempId.flat().join(''))){
            let tempTile = new Tile(...tempId);
            this.memory.set(tempTile.id,tempTile)
        }
        tempId = [[currentTile.a[0]-2,currentTile.a[1]+1]   ,   [currentTile.a[0]-1,currentTile.a[1]]   ,  [currentTile.a[0],currentTile.a[1]]   ,  [currentTile.a[0]+1,currentTile.a[1]+1]   ,   [currentTile.a[0],currentTile.a[1]+2]   ,   [currentTile.a[0]-1,currentTile.a[1]+2]];
        if(!this.memory.has(tempId.flat().join(''))){
            let tempTile = new Tile(...tempId);
            this.memory.set(tempTile.id,tempTile)
        }
        tempId = [ [currentTile.a[0]-2,currentTile.a[1]-1]   ,    [currentTile.a[0]-1,currentTile.a[1]-2]    ,    [currentTile.a[0],currentTile.a[1]-2] ,   [currentTile.a[0] + 1,currentTile.a[1] -1]   ,   [currentTile.a[0],currentTile.a[1]]   ,   [currentTile.a[0]-1,currentTile.a[1]]]
        if(!this.memory.has(tempId.flat().join(''))){
            let tempTile = new Tile(...tempId);
            this.memory.set(tempTile.id,tempTile)
        }
        tempId = [ [currentTile.a[0],currentTile.a[1]-2] , [currentTile.a[0]+1,currentTile.a[1]-3] , [currentTile.a[0]+2,currentTile.a[1]-3] , [currentTile.a[0]+3,currentTile.a[1]-2] , [currentTile.a[0]+2,currentTile.a[1]-1] , [currentTile.a[0]+1,currentTile.a[1]-1]]
        if(!this.memory.has(tempId.flat().join(''))){
            let tempTile = new Tile(...tempId);
            this.memory.set(tempTile.id,tempTile)
        }
        tempId = [ [currentTile.a[0]+2,currentTile.a[1]-1]   ,   [currentTile.a[0]+3,currentTile.a[1]-2]   ,   [currentTile.a[0]+4,currentTile.a[1]-2]   ,   [currentTile.a[0]+5,currentTile.a[1]-1]   ,   [currentTile.a[0]+4,currentTile.a[1]]   ,   [currentTile.a[0]+3,currentTile.a[1]]]
        if(!this.memory.has(tempId.flat().join(''))){
            let tempTile = new Tile(...tempId);
            this.memory.set(tempTile.id,tempTile)
        }
        tempId = [  [currentTile.a[0] +2 , currentTile.a[1] +1]   ,   [currentTile.a[0] +3, currentTile.a[1]]   ,   [currentTile.a[0] + 4 , currentTile.a[1]]    ,   [currentTile.a[0] +5 , currentTile.a[1] +1]    ,   [currentTile.a[0] +4 , currentTile.a[1] +2 ]    ,   [currentTile.a[0] +3 , currentTile.a[1] + 2]  ];  
        if(!this.memory.has(tempId.flat().join(''))){
            let tempTile = new Tile(...tempId);
            this.memory.set(tempTile.id,tempTile)
        }
    }

    dailyFlip(){
        let idToFlip = [];
        let tempMemory = new Map();
        this.memory.forEach(tile =>{
            tempMemory.set(tile.id,tile);
        })
        tempMemory.forEach(tile=>{
            this.expandGrid(tile)
        })
            this.memory.forEach(tile=>{
                
                let adiacents = this.getAdiacents(tile);
                let black = 0;
                adiacents.forEach(adiacent =>{
                    if(this.memory.has(adiacent.flat().join(''))){
                        let adTile = this.memory.get(adiacent.flat().join(''))
                        if(adTile.color === true){
                             black++;
                        }
                    }
                })
                if(tile.color === false){
                    if(black === 2){
                        idToFlip.push(tile.id); 
                    }
                }else if ( tile.color === true){
                    if(black === 0 || black > 2){
                         idToFlip.push(tile.id);
                    }

                }
            })
            return idToFlip;
        }
}

function orderingTile(input){
    let floor = new Floor;
    floor.initialize();
    floor.visitTile(input);
    let black = 0;
    floor.memory.forEach(tile=>{
        if(tile.color === true){
            black++
        }
    })
    console.log('Part One : '.rainbow.bold + black)
    // Part Two --- Result needs aprox 100 seconds to be calculated 
    for (let i = 0; i < 100 ; i++){
        let flipIDs = floor.dailyFlip()
        flipIDs.forEach(tileid =>{
            floor.memory.get(tileid).flip();
        })
    }
    black = 0;
    floor.memory.forEach(tile=>{
        if(tile.color === true){
            black++
        }
    })

    console.log('Part Two : '.rainbow.bold + black)


}
orderingTile(input);
