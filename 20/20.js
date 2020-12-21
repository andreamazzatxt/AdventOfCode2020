const fs = require('fs');
const input = fs.readFileSync('./20.txt','utf-8').split('\n\n').map(tile=>{
    return tile.split('\n')
});

class Tile {
    constructor(key,map){
        this.key = key;
        this.map = map;
        this.borders = {}
        this.flipped = null;
    } 
    findBorders(){
        let top = this.map[0];
        let bottom = this.map[9];
        let right =''
        let left = ''
        this.map.forEach(line =>{
            left += line.substring(0,1)
            right  += line.substring(9,10)
        })
        this.borders['top'] = top;
        this.borders['bottom'] = bottom;
        this.borders['right'] = right;
        this.borders['left'] = left;
        
    }
    generateFlipped(){
        let tempMap = this.map.map(line =>{
            return line.split('').reverse().join('')
        });
        let tempFlipped = new Tile (this.key,tempMap);
        tempFlipped.findBorders();
        this.flipped = tempFlipped;
    }
}

let tiles = [];
input.forEach(tile=> {
    let tempTile = new Tile(tile[0].substring(5,9),[...tile.slice(1)])
    tempTile.findBorders();
    tempTile.generateFlipped();
    tiles.push(tempTile);
})

class Picture {
    constructor(size,tiles){
        this.size = size;
        this.tiles = tiles;
        this.corners = null;
    }
    findCorners(){
        let corners = [];
        this.tiles.forEach(tile1 => {
            let key = tile1.key;
            let match = {
               key :key,
               matchingBorders :[],
            };
            for (let border1 in tile1.borders){
                this.tiles.forEach(tile2 =>{
                    for(let border2 in tile2.borders ){
                        if(tile1.key !== tile2.key){
                         if(tile1.borders[border1] === tile2.borders[border2] ||  tile1.borders[border1] === tile2.borders[border2].split('').reverse().join('')){
                            match.matchingBorders.push(border1);
                         break;
                         };
                        
                        }
                    }

                })
            }
            if(match.matchingBorders.length === 2){
                corners.push(match.key);
            }
        })
        this.corners = corners
        return corners;
    }
}

let seaPicture = new Picture(tiles.length,tiles)
let partOne = 1;
seaPicture.findCorners().forEach(number => {
    partOne *= parseInt(number);
})
console.log('PART ONE: '+ partOne)



