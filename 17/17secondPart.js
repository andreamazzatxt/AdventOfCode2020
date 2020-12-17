const fs = require('fs');
const colors = require('colors');
const input = fs.readFileSync('./17.txt','utf-8').split('\n').map(line => {return line.split('')});

function makeNewEmptyLayer(layerwidth){

    let array =  [];
    for(let x = 0 ;x < layerwidth ; x++){
        array.push(new Array(layerwidth).fill('.'))
    }
    return array;
}
function makeNewEmptyBorder(layer){ // Makes an empty border arount an existent layer
    let newLayer = [];
    newLayer.push(new Array(layer.length+2).fill('.'))
    layer.forEach(line =>{
        newLayer.push(['.',...line,'.'])
    })
    newLayer.push(new Array(layer.length+2).fill('.'))
    return newLayer;
}
function makeNewEmptyTime(numlayer,numrow,numcubes){
    let time = [];
    for ( let x = 0 ; x < numlayer ;x++){
        time.push(makeNewEmptyLayer(numrow))
    }
    return time;
}

function getAdiacents(map,x,y,z,w){
    let adiacents = [];

    for (let i = (w-1) ; i <= (w+1) ; i++){
        if(map[i]){
            for (let j = (z-1) ; j <= (z+1) ; j++){
                if(map[i][j]){
                    for(let k = (y-1); k <= (y+1) ; k++){
                        if( map[i][j][k]){
                            for(let h = (x-1) ; h <= (x+1) ; h++){
                                if(map[i][j][k][h]){
                                    adiacents.push([i,j,k,h])
                                }else{
                                    continue;
                                }
                            }
                        }else{
                            continue;
                        }
                    }
                }else{
                    continue
                }
            }
        }else{
            continue;
        }
    }
    // remove the same cube
    let indexToRemove = 0
    adiacents.forEach((coord,index) =>{
        if(coord[3] === x && coord[2] === y && coord[1] === z && coord[0] === w){
            indexToRemove = index
        }
    })
    adiacents.splice(indexToRemove,1);    
    return adiacents;
}

function checkActiveCubes(map,x,y,z,w){
    let adiacents = getAdiacents(map,x,y,z,w); 
    let count = 0;  
    adiacents.forEach(coord => {
        if(map[coord[0]][coord[1]][coord[2]][coord[3]] === '#'){
            count++;
        }  
    });
    return count;
}

function partTwo(initialLayer,target){
   let cycles = 0;   
   let fourDimensionModel = [[initialLayer]]; 
   while(cycles <= target-1){
    // ADD BORDER FOR EACH LAYER IN EACH TIME 
    fourDimensionModel = fourDimensionModel.map(time=>{
        return time.map(layer => {
            return makeNewEmptyBorder(layer);
        })
    });
    // ADD 2 LAYERS in EACH TIME (one in front of the exiating and one on the back)
    fourDimensionModel = fourDimensionModel.map(time =>{
        return [makeNewEmptyLayer(fourDimensionModel[0][0].length),...time, makeNewEmptyLayer(fourDimensionModel[0][0].length)]
    })
    // ADD 2 MORE TIME ONE IN THE FUTURE AND ONE IN THE PAST 
    fourDimensionModel = [makeNewEmptyTime(fourDimensionModel[0].length,fourDimensionModel[0][0].length),...fourDimensionModel,makeNewEmptyTime(fourDimensionModel[0].length,fourDimensionModel[0][0].length,)];
    // MAKE A COPY OF THE ACTUAL STATUS TO ITERATE 
    let tempFourDimensionModel = fourDimensionModel.map((time,tindex) => {
        return time.map((layer,lindex) =>{
            return layer.map(line => {
                return line.map(cube => {
                    return cube})
            })
     })
    })
        for(let w = 0 ; w < fourDimensionModel.length; w++){
            for(let z = 0 ; z < fourDimensionModel[0].length ; z++){
                for(let y = 0 ; y < fourDimensionModel[0][0].length ; y ++){
                    for(let x = 0 ; x < fourDimensionModel[0][0][0].length ; x++){
                        let countActive = checkActiveCubes(tempFourDimensionModel,x,y,z,w);
                        if( fourDimensionModel[w][z][y][x] === '#'){
                            if ( countActive !== 2 && countActive !== 3){
                                fourDimensionModel[w][z][y][x] = '.'
                            }
                        }else if (fourDimensionModel[w][z][y][x] === '.'){
                            if (countActive === 3 ){
                                fourDimensionModel[w][z][y][x] = '#'
                            }
                        }
                    }

                }
            }
        }

    cycles++;
   }
   let countFinalActive = 0;
   fourDimensionModel.forEach((time,indexTime) =>{
       time.forEach((layer,layerindex) =>{
           layer.forEach(line =>{
               line.forEach(cube =>{
                if(cube === '#'){
                    countFinalActive++
                }
               })
           })
       })
   }) 
   console.log('PART TWO: '.rainbow + countFinalActive);
}

partTwo(input,6)
