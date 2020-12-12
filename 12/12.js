const fs = require('fs');
let instructions = fs.readFileSync('./12.txt',{encoding: 'utf-8'}).split('\n').map(e => [e.substring(0,1),parseInt(e.substring(1))]);


function changeDirection(prev,degrees){
    let orientations = ['N','E','S','W']
    //CALCULATING HOW MANY "SPIN" OF 90 DEGREES AND MOVING THROUGH THE ORIENTATIONS ARRAY (WHICH IS IN ORDER) 
    let spin = degrees/90;
    let posAct = orientations.indexOf(prev) + spin;
    let pos = ((posAct % 4 ) + 4 ) % 4 ;
    return orientations[pos];
}



//PART ONE
function navigationPartOne(instructions){
    let orient = 'E';
    let ns = 0;
    let we = 0;
    instructions.forEach(instrucion =>{
        switch(instrucion[0]){
            case 'N':
                ns += instrucion[1];
                break;
            case 'S':
                ns -= instrucion[1];
                break;
            case 'E':
                we += instrucion[1];
                break;
            case 'W':
                we -= instrucion[1];
                break;
            case 'L':
                orient = changeDirection(orient,- instrucion[1])
                break;
            case 'R':
                orient = changeDirection(orient,instrucion[1])
                break;
            case 'F':
                switch(orient){
                    case 'N':
                        ns += instrucion[1];
                        break;
                    case 'S':
                        ns -= instrucion[1];
                        break;
                    case 'E':
                        we += instrucion[1];
                        break;
                    case 'W':
                        we -= instrucion[1];
                        break;

                }
                break;
        }
    })
    return Math.abs(ns)+Math.abs(we);
}
//PART TWO 
function directionPartTwo(wayPoint,instruction){
    // CALCULATING HOW MANY STEPS OF 90 DEGREES AND APPLY TO WAYPOINT N TIMES 
    // A "STEP " OF 90 DEGREES CORRESPOND TO SWAPPING X AND Y AXES VALUES.
    // IN CASE OF NEGATIVE DEGREE VALUES (LEFT TURN) AXES X COORD BECOME NEGATIVE
    // IN CASE OF POSITIVE DEGREE VALUES (RIGHT TURN) AXES Y COORD BECOME NEGATIVE
    let degrees = instruction[1] ;
    let direction = instruction[0] ; 
    let steps = degrees/90 ;
    let newWayPoint = wayPoint.map(e => e);
    for(let i = 0 ; i < steps ; i++){
        if(direction === 'L'){
            newWayPoint = [-newWayPoint[1],newWayPoint[0]]
        }else{
            newWayPoint = [newWayPoint[1],-newWayPoint[0]]
        }
    }
    return newWayPoint;
}
function navigationPartTwo(instructions){
    let wayPoint = [10,1]
    let ns = 0;
    let we = 0;
    instructions.forEach(instrucion =>{
        switch(instrucion[0]){
            case 'N':
                wayPoint[1] += instrucion[1];
                break;
            case 'S':
                wayPoint[1] -= instrucion[1];
                break;
            case 'E':
                wayPoint[0] += instrucion[1];
                break;
            case 'W':
                wayPoint[0] -= instrucion[1];
                break;
            case 'L':
                wayPoint = directionPartTwo(wayPoint,instrucion);
                break;
            case 'R':
                wayPoint = directionPartTwo(wayPoint,instrucion);
                break;
            case 'F':
                ns = ns + (wayPoint[1] * instrucion[1]);
                we = we + (wayPoint[0] * instrucion[1]);
                break;
        }
    })

    return Math.abs(ns)+Math.abs(we);

}

console.log(navigationPartTwo(instructions));