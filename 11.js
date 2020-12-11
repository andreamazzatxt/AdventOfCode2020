const fs = require('fs');
let map = fs.readFileSync('./11.txt',{encoding: 'utf-8'}).split('\n');

map = map.map(row =>{
    return row.split('');
})
let rowSize = map.length-1;
let columnSize = map[0].length-1;

function getAdiancent(map,row,column){

    let adiacents = []; 
    let plusrow = row + 1; 
    let minusrow = row -1; 
    let pluscolumn = column + 1 ; 
    let minuscolumn = column -1 ; 
    //DOWN ROW CASES
    if(plusrow <= rowSize){

        if(pluscolumn <= columnSize){
            if(map[plusrow][pluscolumn] !== '.'){
                adiacents.push([plusrow,pluscolumn]);
            }else{
                let exit = false;
                let dirRow =1;
                let dirCol =1;
                while(!exit){
                    let newRow= plusrow+dirRow;
                    let newCol = pluscolumn +dirCol;
                    if(!map[newRow]){
                        exit =true;
                    }else if(!map[newRow][newCol]){
                        exit =true;
                    }else if(map[newRow][newCol] !== '.'){
                        exit = true;
                        adiacents.push([newRow,newCol]);
                    }else{
                        dirRow++;
                        dirCol++;
                    }
                }
            }
            
        }


        if(map[plusrow][column] !=='.'){
            adiacents.push([plusrow,column]);
        }else{
            let exit = false;
            let dirRow = 1;
            while(!exit){
                let newRow= plusrow+dirRow;
                if(!map[newRow]){
                    exit = true;    
                }else if(map[newRow][column] !== '.'){
                    exit = true;
                    adiacents.push([newRow,column]);
                }else{
                    dirRow++;
                }
            }
        }
        if(minuscolumn >= 0){
            if(map[plusrow][minuscolumn] !== '.'){
                adiacents.push([plusrow,minuscolumn]);
            }else{
                let exit = false;
                let dirRow =1;
                let dirCol =-1;
                while(!exit){
                    let newRow= plusrow+dirRow;
                    let newCol = minuscolumn + dirCol;
                    if(!map[newRow]){
                        exit = true;
                    }else if(!map[newRow][newCol]){
                        exit = true;
                    }else if(map[newRow][newCol] !== '.'){
                        exit = true;
                        adiacents.push([newRow,newCol]);
                    }else{
                        dirRow++;
                        dirCol--;
                    }
            }
            
        }
      
            }
        }
    // SAME ROW CASES
    if(pluscolumn <= columnSize){
        if(map[row][pluscolumn] !== '.'){
          adiacents.push([row,pluscolumn]);   
        }else{
            let exit = false;
                let dirCol =1;
                while(!exit){
                    let newCol = pluscolumn +dirCol;
                    if(!map[row][newCol]){
                        exit = true;
                    }else if(map[row][newCol] !== '.'){
                        exit = true;
                        adiacents.push([row,newCol]);
                    }else{
                        dirCol++;
                    }
          }
       
        }
    }   

    if(minuscolumn >= 0){
        if(map[row][minuscolumn] !== '.'){
            adiacents.push([row,minuscolumn]); 
        }else{
            let exit = false;
            let dirCol = -1;
            while(!exit){
                let newCol = minuscolumn + dirCol;
                if(!map[row][newCol]){
                    exit = true;
                }else if(map[row][newCol] !== '.'){
                    exit = true;
                    adiacents.push([row,newCol]);
                }else{
                    dirCol--;
                }
            }
        }
        
    }
   // UPPER ROW CASES
    if(minusrow >= 0 ){
        if(pluscolumn <= columnSize){
            if(map[minusrow][pluscolumn] !== '.'){
            
             adiacents.push([minusrow,pluscolumn]);   
            }else{
                let exit = false;
                let dirRow =-1;
                let dirCol = 1;
                while(!exit){
                    let newRow = minusrow + dirRow;
                    let newCol = pluscolumn + dirCol;
                    if(!map[newRow]){
                        exit = true;
                    }else if(!map[newRow][newCol]){
                        exit = true;
                    }else if(map[newRow][newCol] !== '.'){
                        exit = true;
                        adiacents.push([newRow,newCol]);   
                    }else{
                        dirRow--;
                        dirCol++;
                    }
                }
            }
        }

        if(map[minusrow][column] !== '.'){
            adiacents.push([minusrow,column]);
        }else{
            let exit = false;
            let dirRow =-1;
            while(!exit){
                let newRow= minusrow+dirRow;
                if(!map[newRow]){
                    exit = true;
                }else if(map[newRow][column] !== '.'){
                    exit = true;
                    adiacents.push([newRow,column]);
                }else{
                    dirRow--;
                }
            }
        }
        
        if(minuscolumn >= 0){
            if(map[minusrow][minuscolumn] !== '.'){
                adiacents.push([minusrow,minuscolumn]); 
            }else{
                let exit = false;
                let dirRow = -1;
                let dirCol = -1;
                while(!exit){
                    let newRow= minusrow+dirRow;
                    let newCol = minuscolumn +dirCol;
                    if(!map[newRow]){
                        exit = true;
                    }else if(!map[newRow][newCol]){
                        exit = true;
                    }else if(map[newRow][newCol] !== '.'){
                        exit = true;
                        adiacents.push([newRow,newCol]);
                    }else{
                        dirRow--;
                        dirCol--;
                    }
                }
            }
        
        }
   
    }

   return adiacents;
    
}





function checkAdiacent(map,row,column){
    let adiacents = getAdiancent(map,row,column);
    let countSeated = 0;
    adiacents.forEach(seat =>{
        if(map[seat[0]][seat[1]] === '#'){
            countSeated++;
        }
    })
    if(countSeated>=5){
        return true;
    }else{
        return false;
    }
}

function checkAdiacentfree(map,row,column){
    let adiacents = getAdiancent(map,row,column);
    let countFree =0;
    adiacents.forEach(seat =>{
        if(map[seat[0]][seat[1]] === 'L' || map[seat[0][seat[1]]] === '.'){
            countFree++;
        }
    })
    if(countFree == adiacents.length){
        return true;
    }else{
        return false;
    }
    
}

function areEquals(arr,arr2){
    let string1 = '';
     arr.forEach(e =>{
        e.forEach(s =>{
            string1 =string1 + s
        })
    });
    let string2 = '';
    arr2.forEach(e =>{
       e.forEach(s =>{
           string2 =string2 + s
       })
   });

    return string1===string2;
}

function boarding(mapArr){
let tempMap = mapArr.map(e => {
    return e.map(s => s);
});
let finish = false;

while(!finish){
    finish++;
let copyActualMap = tempMap.map(e =>{
    return e.map(s => s)
});
//SEAT
let seatedCoord = [];
for(let r = 0; r <= rowSize ; r++){
    for(let c = 0; c <= columnSize; c++ ){
        if(checkAdiacentfree(tempMap,r,c)){
            seatedCoord.push([r,c]);
        }

    }
}

seatedCoord.forEach(coord =>{
   if( tempMap[coord[0]][coord[1]] === 'L'){
     tempMap[coord[0]][coord[1]] = '#'
   }
})

//UNSEAT
let coordToFree = [];
for(let r = 0; r <= rowSize ; r++){
    for(let c = 0 ; c <= columnSize ; c++){
        if(tempMap[r][c] === '#'){
            
           if(checkAdiacent(tempMap,r,c)){
             coordToFree.push([r,c]) 

           }
        }
    }
}
coordToFree.forEach(coord =>{
    tempMap[coord[0]][coord[1]] = 'L';
})
    finish = areEquals(tempMap,copyActualMap)

}
//COUNT SEATED
let counter = 0;
for(let r = 0 ; r <= rowSize ; r++){
    for(let c = 0; c <= columnSize ; c++){
        if(tempMap[r][c] === '#'){
            counter++;
        }
    }
}
console.log(counter)
}
boarding(map);

