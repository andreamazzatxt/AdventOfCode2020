const colors = require('colors')
const fs = require('fs');
const input = fs.readFileSync('./20.txt','utf-8').split('\n\n').map(tile=>{
    return tile.split('\n')
});
const monster = fs.readFileSync('./monster.txt','utf-8').split('\n');

class Tile {
    constructor(key,map){
        this.key = key;
        this.map = map;
        this.borders = {};
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
    flip(){
        this.map = this.map.map(line =>{
            return line.split('').reverse().join('')
        });
        this.findBorders();
        return this.borders;
    }
    rotate(){
        let line1 = this.map.map(line=>{
            return line.substring(0,1);
        }).reverse().join('');
        let line2 = this.map.map(line=>{
            return line.substring(1,2);
        }).reverse().join('');
        let line3 = this.map.map(line=>{
            return line.substring(2,3);
        }).reverse().join('');
        let line4 = this.map.map(line=>{
            return line.substring(3,4);
        }).reverse().join('');
        let line5 = this.map.map(line=>{
            return line.substring(4,5);
        }).reverse().join('');
        let line6 = this.map.map(line=>{
            return line.substring(5,6);
        }).reverse().join('');
        let line7 = this.map.map(line=>{
            return line.substring(6,7);
        }).reverse().join('');
        let line8 = this.map.map(line=>{
            return line.substring(7,8);
        }).reverse().join('');
        let line9 = this.map.map(line=>{
            return line.substring(8,9);
        }).reverse().join('');
        let line10 = this.map.map(line=>{
            return line.substring(9,10);
        }).reverse().join('');
        let newMap = [line1,line2,line3,line4,line5,line6,line7,line8,line9,line10]; 
        this.map = newMap;
        this.findBorders();
        return this.borders;
    }
    crop(){
        let tempMap = this.map.slice(1,9);
        tempMap = tempMap.map(line =>{
            return line.substring(1,9);
        })
        this.map = tempMap;

        
    }
}

let tiles = [];
input.forEach(tile=> {
    let tempTile = new Tile(tile[0].substring(5,9),[...tile.slice(1)])
    tempTile.findBorders();
    tiles.push(tempTile);
})

class Picture {
    constructor(size,tiles){
        this.size = Math.sqrt(size);
        this.tiles = tiles;
        this.corners = [];
        this.picture = [];
        this.mergedPicture = null;
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
        // set corners in class prop
        corners.forEach(cornerkey =>[
            this.tiles.forEach(tile =>{
                if(tile.key === cornerkey){
                    this.corners.push(tile);

                }
            })
        ])
        // delete tiles from tiles prop that mtches with corners
        corners.forEach(cornerkey =>{
           this.tiles =  this.tiles.filter(tile=>{
                return tile.key !== cornerkey;
            })
        })
        return corners;
    }
    findMatchingTiles(startingTile){
        let match = {
            left : null,
            right: null,
            top: null,
            bottom: null,
        }
        //look for top matching 
        this.tiles.forEach(tile =>{ 
            for(let i = 0; i < 4 ; i++){
                if(startingTile.borders.top === tile.borders.bottom){
                  match.top = tile;
                  break;
                }else{
                    tile.rotate();
                }
            }
            if(match.top === null){
            tile.flip();
            for(let i = 0; i < 4 ; i++){
              if(startingTile.borders.top === tile.borders.bottom){
                match.top = tile;
                break;
              }else{
                  tile.rotate();
              }
          }}
          })
          if(match.top !== null){
              this.tiles = this.tiles.filter(tile => {return tile.key !== match.top.key})
          }
        //look for bottom matching 
        this.tiles.forEach(tile =>{ 
                for(let i = 0; i < 4 ; i++){
                if(startingTile.borders.bottom === tile.borders.top){
                  match.bottom = tile;
                  break;
                }else{
                    tile.rotate();
                }
            }
            if(match.bottom === null){
                tile.flip();
            for(let i = 0; i < 4 ; i++){
              if(startingTile.borders.bottom === tile.borders.top){
                match.bottom = tile;
                break;
              }else{
                  tile.rotate();
              }
          }}
          })
          if(match.bottom !== null){
            this.tiles = this.tiles.filter(tile => {return tile.key !== match.bottom.key})
        }
          // look for left matching 
          this.tiles.forEach(tile =>{ 
    
                for(let i = 0; i < 4 ; i++){
                if(startingTile.borders.left === tile.borders.right){
                  match.left = tile;
                  break;
                }else{
                    tile.rotate();
                }
            }
            if(match.left === null){
            tile.flip();
            for(let i = 0; i < 4 ; i++){
              if(startingTile.borders.left === tile.borders.right){
                match.left = tile;
                break;
              }else{
                  tile.rotate();
              }
          }}
          })
          if(match.left !== null){
            this.tiles = this.tiles.filter(tile => {return tile.key !== match.left.key})
        }
          // look for right matching
          this.tiles.forEach(tile =>{ 
                for(let i = 0; i < 4 ; i++){
                if(startingTile.borders.right === tile.borders.left){
                  match.right = tile;
                  break;
                }else{
                    tile.rotate();
                }
            }
            if(match.right === null){
                tile.flip();
            for(let i = 0; i < 4 ; i++){
              if(startingTile.borders.right === tile.borders.left){
                match.right = tile;
                break;
              }else{
                  tile.rotate();
              }
          }}
          })
          if(match.right !== null){
            this.tiles = this.tiles.filter(tile => {return tile.key !== match.right.key})
        }
        
          return match;

    }
    generatePicture(){
        // start generating picture from one casual corner 
        let startingTile = null;
        this.corners.forEach(corner =>{
            let match = this.findMatchingTiles(corner);
            if (match.left !== null && match.bottom !== null){
                startingTile = corner;
                this.tiles.push(match.left);
                this.tiles.push(match.bottom);
            }else{
                this.tiles.push(corner);
                if(match.right !== null){
                    this.tiles.push(match.right);
                }
                if(match.left !== null){
                    this.tiles.push(match.left);
                }
                if(match.bottom !== null){
                    this.tiles.push(match.bottom);
                }
                if(match.top !== null){
                    this.tiles.push(match.top);
                }

            }
        })
        this.corners = [];
        this.picture = [[startingTile]];
        let currentTile = startingTile;
        let coordx = 0;
        let coordy = 0;
        let finish = false;
       while(!finish){ 
        let matching = this.findMatchingTiles(currentTile);
        let discovered ={};
       for( let key in matching){
           if( matching[key] !== null){
               if(key === 'left'){
                    this.picture[coordy].unshift(matching.left)
                    discovered[key] = true;
               }
               if(key === 'bottom'){
                   if(!this.picture[coordy+1]){
                    this.picture.push([matching.bottom])
                    discovered[key] = true;
                   }else{
                       this.tiles.push(matching.bottom)
                   }
               }
               if( key === 'top'){
                   if(!this.picture[coordy-1]){
                    this.picture.unshift([matching.top])
                    discovered[key] = true;
                   }else{
                       this.tiles.push(matching.top)
                   }
               }
               if( key === 'right'){
                 this.picture[coordy].push(matching.right)
                 discovered[key] = true;
               }
           }
       }
       if(discovered.right){
        coordx++
       }else if(discovered.bottom){
        coordy++
       }else if(!discovered.right && !discovered.left && !discovered.bottom && !discovered.top && coordy>0){
           coordy--
       }

       let checklines = 0;
       this.picture.forEach(line =>{
           if (line.length === this.size){
            checklines++;
           }
       })
       if(checklines === this.size && this.picture.length === this.size){
         finish = true;  
       }else{
        console.log('-----')
        console.log('Allocating : ' + currentTile.key)
        console.log('-----')
         currentTile = this.picture[coordy][coordx] 
       }

    }

    }
    mergePicture(){
        let merged =[];
        this.picture.forEach(line => {
            let mergedlines = ['','','','','','','',''];
            line.forEach(tile=>{
                tile.map.forEach((string,index)=>{
                    mergedlines[index] += string;
                })
            })
            merged.push(mergedlines);
        })
        merged = merged.flat();
        this.mergedPicture = merged;
        return merged;

    }

    cropPicture(){
        this.picture.forEach(line=>{
            line.forEach(tile =>{
                tile.crop();
            })
        })
    }
    flipPicture(){
        this.mergedPicture = this.mergedPicture.map(line=>{
            return line.split('').reverse().join('');
        })
        return this.mergedPicture;
    }
    rotatePicture(){
        let size = this.mergedPicture.length;
        let newPic = [];
        for (let i = 0; i < size ; i++ ){
            let line = '';
            this.mergedPicture.forEach(row=>{
                line += row[i];
            })
            newPic.push(line.split('').reverse().join(''));
        }
        this.mergedPicture = newPic
       return newPic;
    }
    findMonster(){
        // Rotation only works with this input ,for different inputs try different combinations of rotatePicture()  or flipPicture();
        this.rotatePicture();
        this.rotatePicture();
        this.rotatePicture();
        let stepsX = this.mergedPicture[0].length-monster[0].length;
        let stepsY = this.mergedPicture.length - monster.length;
        let foundMonsters = 0;
        for(let y = 0 ; y <= stepsY ; y++){
            for(let x = 0 ; x <= stepsX; x++){
            let check = 0;
            let lineA = this.mergedPicture[y].substring(x,x+20).split('');
            let lineB = this.mergedPicture[y+1].substring(x,x+20).split('');
            let lineC = this.mergedPicture[y+2].substring(x,x+20).split('');
            let monsterA = monster[0].split('');
            let monsterB = monster[1].split('');
            let monsterC = monster[2].split('');
            //Check Line 1
                  for( let i = 0; i < lineA.length; i++){ 
                    if(monsterA[i] ==='O'){
                        if(lineA[i] === '#'){
                            check++
                        }
                    }}
         
            // Check Line 2
            for( let i = 0; i < lineA.length; i++){ 
                if(monsterB[i] ==='O'){
                    if(lineB[i] === '#'){
                        check++
                    }
                }}
            //Check Line 3
            for( let i = 0; i < lineA.length; i++){ 
                if(monsterC[i] ==='O'){
                    if(lineC[i] === '#'){
                        check++
                    }
                }}
           if(check === 15){
                foundMonsters++;
            }  
        }
        }
        let monsterHash = foundMonsters*15;
        let countHash = 0;
        this.mergedPicture.forEach(line =>{
            line.split('').forEach(char =>{
                if(char === '#'){
                    countHash++;
                }
            })
        })
        return (countHash-monsterHash);

    }

}

let seaPicture = new Picture(tiles.length,tiles)
let partOne = 1;
seaPicture.findCorners().forEach(number => {
    partOne *= parseInt(number);
})
console.log('PART ONE: '+ partOne)
seaPicture.generatePicture();
seaPicture.cropPicture();
console.log(seaPicture.mergePicture());
console.log('PART ONE: '.rainbow.bold+ partOne)
console.log('PART TWO: '.rainbow.bold + seaPicture.findMonster());








