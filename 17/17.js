const fs = require('fs');
const colors = require('colors');
const input = fs.readFileSync('./17.txt','utf-8').split('\n').map(line => {return line.split('')});

function makeNewEmptyLayer(layerwidth){
    return new Array(layerwidth).fill(new Array(layerwidth).fill('.'))
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
function countActiveAdiacentsCubes(ThreeDimensionModel,X,Y,Z){
    let activeCount = 0;
    // CHECK SAME LAYER CUBES
    // SAME LINE CUBES
    if(ThreeDimensionModel[Z][Y][X-1] && ThreeDimensionModel[Z][Y][X-1] === '#' ){
        activeCount++;

    }
    if(ThreeDimensionModel[Z][Y][X+1] && ThreeDimensionModel[Z][Y][X+1] === '#' ){
        activeCount++;
   
    }
    //UPPER LINE CUBES
    if(ThreeDimensionModel[Z][Y-1]){ //check if upperline exists
        if(ThreeDimensionModel[Z][Y-1][X] && ThreeDimensionModel[Z][Y-1][X] === '#'){
            activeCount++;
      
        }
        if(ThreeDimensionModel[Z][Y-1][X-1] && ThreeDimensionModel[Z][Y-1][X-1] === '#'){
            activeCount++;
      
        }
        if(ThreeDimensionModel[Z][Y-1][X+1] && ThreeDimensionModel[Z][Y-1][X+1] === '#'){
            activeCount++;
      
        }
    }
    //bottom LINE CUBES
    if(ThreeDimensionModel[Z][Y+1]){ //check if bottom exists
        if(ThreeDimensionModel[Z][Y+1][X] && ThreeDimensionModel[Z][Y+1][X] === '#'){
            activeCount++;
            
        }
        if(ThreeDimensionModel[Z][Y+1][X-1] && ThreeDimensionModel[Z][Y+1][X-1] === '#'){
            activeCount++;
            
        }
        if(ThreeDimensionModel[Z][Y+1][X+1] && ThreeDimensionModel[Z][Y+1][X+1] === '#'){
            activeCount++;
            
        }
    }  

    //CHECK LAYER +1
    if(ThreeDimensionModel[Z+1]){ // check if the layer exists

        if(ThreeDimensionModel[Z+1][Y][X-1] && ThreeDimensionModel[Z+1][Y][X-1] === '#' ){
            activeCount++;
        }
        if(ThreeDimensionModel[Z+1][Y][X+1] && ThreeDimensionModel[Z+1][Y][X+1] === '#' ){
            activeCount++;
        }
        if(ThreeDimensionModel[Z+1][Y][X] && ThreeDimensionModel[Z+1][Y][X] === '#' ){
            activeCount++;
        }
        //UPPER LINE CUBES
        if(ThreeDimensionModel[Z+1][Y-1]){ //check if upperline exists
            if(ThreeDimensionModel[Z+1][Y-1][X] && ThreeDimensionModel[Z+1][Y-1][X] === '#'){
                activeCount++;
            }
            if(ThreeDimensionModel[Z+1][Y-1][X-1] && ThreeDimensionModel[Z+1][Y-1][X-1] === '#'){
                activeCount++;
            }
            if(ThreeDimensionModel[Z+1][Y-1][X+1] && ThreeDimensionModel[Z+1][Y-1][X+1] === '#'){
                activeCount++;
            }
        }
        //bottom LINE CUBES
        if(ThreeDimensionModel[Z+1][Y+1]){ //check if bottom exists
            if(ThreeDimensionModel[Z+1][Y+1][X] && ThreeDimensionModel[Z+1][Y+1][X] === '#'){
                activeCount++;
            }
            if(ThreeDimensionModel[Z+1][Y+1][X-1] && ThreeDimensionModel[Z+1][Y+1][X-1] === '#'){
                activeCount++;
            }
            if(ThreeDimensionModel[Z+1][Y+1][X+1] && ThreeDimensionModel[Z+1][Y+1][X+1] === '#'){
                activeCount++;
            }
        }  

    }

    // CHECK  LAYER -1 CUBES 
    if(ThreeDimensionModel[Z-1]){

        if(ThreeDimensionModel[Z-1][Y][X-1] && ThreeDimensionModel[Z-1][Y][X-1] === '#' ){
            activeCount++;
        }
        if(ThreeDimensionModel[Z-1][Y][X+1] && ThreeDimensionModel[Z-1][Y][X+1] === '#' ){
            activeCount++;
        }
        if(ThreeDimensionModel[Z-1][Y][X] && ThreeDimensionModel[Z-1][Y][X] === '#' ){
            activeCount++;
        }
        //UPPER LINE CUBES
        if(ThreeDimensionModel[Z-1][Y-1]){ //check if upperline exists
            if(ThreeDimensionModel[Z-1][Y-1][X] && ThreeDimensionModel[Z-1][Y-1][X] === '#'){
                activeCount++;
            }
            if(ThreeDimensionModel[Z-1][Y-1][X-1] && ThreeDimensionModel[Z-1][Y-1][X-1] === '#'){
                activeCount++;
            }
            if(ThreeDimensionModel[Z-1][Y-1][X+1] && ThreeDimensionModel[Z-1][Y-1][X+1] === '#'){
                activeCount++;
            }
        }
        //bottom LINE CUBES
        if(ThreeDimensionModel[Z-1][Y+1]){ //check if bottom exists
            if(ThreeDimensionModel[Z-1][Y+1][X] && ThreeDimensionModel[Z-1][Y+1][X] === '#'){
                activeCount++;
            }
            if(ThreeDimensionModel[Z-1][Y+1][X-1] && ThreeDimensionModel[Z-1][Y+1][X-1] === '#'){
                activeCount++;
            }
            if(ThreeDimensionModel[Z-1][Y+1][X+1] && ThreeDimensionModel[Z-1][Y+1][X+1] === '#'){
                activeCount++;
            }
        }  

    }
    return activeCount;
    }


function cycles(initialLayer,target){
   let cycles = 0;  
   let layerwidth = initialLayer.length // assuming it is always a square layer 
   let ThreeDimensionModel = [initialLayer];  
   while(cycles <= target-1){
    // Add a new layer for each side for each cycle
    ThreeDimensionModel = [makeNewEmptyLayer(layerwidth),...ThreeDimensionModel,makeNewEmptyLayer(layerwidth)];
    //Add a new 'BORDER' made of inactive cubes around each layer (this makes possibe checking external cubes because the space is infinite);
    ThreeDimensionModel =  ThreeDimensionModel.map(layer =>{
        return makeNewEmptyBorder(layer);
    })
    //Update the layer width so in the next cycle is possible to keep adding layers and borders
    layerwidth = ThreeDimensionModel[0].length;
    let TempThreeDimensionModel =  ThreeDimensionModel.map(layer => {
        return layer.map(line => {
            return line.map(cube => cube);
        })
    })
    //Loop each layer,  line and cube to check adiacent cubes and counting 'ACTIVE' Cubes
    TempThreeDimensionModel.forEach((layer,layerindex) =>{

        layer.forEach((line,lineindex) =>{
    
            line.forEach((cube,cubeindex) =>{
              let count = countActiveAdiacentsCubes(TempThreeDimensionModel,cubeindex,lineindex,layerindex) ;
              //Condition to inactive/active the current cube
              if(cube === '#') {
                if(count !== 3 && count !== 2 ){
                  ThreeDimensionModel[layerindex][lineindex][cubeindex] = '.';   
                }
              }else if(cube === '.' && count === 3){
                ThreeDimensionModel[layerindex][lineindex][cubeindex] = '#';
              }

            })
        })
    })
    cycles++;
   }

   let countFinalActive = 0;
   ThreeDimensionModel.forEach(layer => {

       layer.forEach(line =>{
           line.forEach(cube =>{
               if(cube === '#'){
                   countFinalActive++;
               }
           })
       })
   })
   console.log('PART ONE: '.rainbow + countFinalActive);
}

cycles(input,6)