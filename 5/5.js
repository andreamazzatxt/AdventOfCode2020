const fs = require('fs')
const boardingPass = fs.readFileSync('./5.txt','utf-8').split('\n');


function calcSeatID(string){
    let arrTxt = string.split("");
    let column = [0,1,2,3,4,5,6,7];
    let row = [1,128];
    let seatId = 0;
    for(let i=0; i<=6; i ++){
        let range = row[1]+row[0];
        let midPoint = Math.floor(range/2);
       if (arrTxt[i] === "B") {
           row[0] = midPoint;
           
       }
       if (arrTxt[i]=== "F"){
           row[1] = midPoint;
           
       }
    }
    for(let i = 7 ; i <= 9 ; i++){
    let midColumn = column.length / 2;       
    if (arrTxt[i] === 'R'){
      column.splice(0,midColumn)  
    }
    if(arrTxt[i] === 'L'){
        column.splice(midColumn,midColumn)
    }
    }
    seatId = row[0] * 8;
    seatId += column[0];
   return [row[0],column[0]];
}
function checkBoardings(arr){
    let highest = 0;
    let map =[];
    for (let i=0; i<128 ; i++){
        map.push(['O','O','O','O','O','O','O','O'])
    }
    arr.forEach(boardingPass =>{
        let coord = calcSeatID(boardingPass);
        map[coord[0]][coord[1]] = 'X'
        


    })
    console.table(map);
    console.log(highest);
}




checkBoardings(boardingPass);