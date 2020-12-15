const fs = require('fs');
const mapPattern = fs.readFileSync('./3.txt','utf-8').split('\n');


const tree = '#';
const free = '.';

let schemeMap = mapPattern.map(riga =>{
    return riga.split("");
})

function countTrees(arr,right, down){
    let arrived = false;
    let matrixX = arr[0].length - 1;
    let matrixY = arr.length - 1;
    let x = 0;
    let y = 0;
    let trees = 0;
    let frees = 0;
    while(!arrived){
        x += right;
        if ( x > matrixX){
            x -= matrixX +1;
        };
        y += down;
        if (y === matrixY){arrived=true}
        if (arr[y][x] === tree ){trees++
        };
        if (arr[y][x] === free) {frees++
    };
    }
    return(trees);

}

let caseA = countTrees(schemeMap,1,1)
let caseB = countTrees(schemeMap,3,1)
let caseC = countTrees(schemeMap,5,1)
let caseD = countTrees(schemeMap,7,1)
let caseE = countTrees(schemeMap,1,2)
console.log(caseA*caseB*caseC*caseD*caseE)