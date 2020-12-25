
const colore = require ('colors');
const publicDoor = 14205034;
const publicCard = 18047856;
function loop(subject,key){
let value = 1;
for(let i=1;i<100000000000;i++){
    value = value * subject;
    value = value % 20201227;
    if (key === value){
        return i
    }
}
return value;
}
function encrypt(loopsize,subject){
    let value = 1;
    for(let i=0;i<loopsize;i++){
        value = value * subject;
        value = value % 20201227;
    }
    return value;
    }
    


let loopCard = loop(7,publicCard);
let loopDoor = loop(7,publicDoor);

let encryptionKey= encrypt(loopCard,publicDoor);
console.log({loopDoor, loopCard })
console.log('Encryption  Key : '.rainbow.bold + encryptionKey)

