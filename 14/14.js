const fs = require('fs');

const input = fs.readFileSync('./14.txt',{encoding: 'utf-8'}).split('\n').map(e=>{
    if(e[0] === 'm' && e[1] === 'a'){
        return ['mask',e.substr(7)]; 
    }else{
        e = e.split(' = ');
        e[0]= e[0].substr(3);
   
        return [e[0],parseInt([e[1]])]
    }
});
//PART ONE 
let memory = {}
let mask = '';

input.forEach(instruction =>{
     if (instruction[0]==='mask'){
         mask = instruction[1].split('');
     }else{
         let binary = instruction[1].toString(2).padStart(36,'0').split('');

            //APPLY MASK
            for(let i = 0; i < 36 ; i++){
                if(mask[i] !== 'X'){
                    binary[i] = mask[i];    
                }
            }
         memory[instruction[0]] = binary; 
     }
});
let sum = 0
Object.keys(memory).forEach(key =>{
    let string = memory[key].join('');
    sum += parseInt((string),2)
})
console.log('PART ONE : ' + sum)
//PART TWO

const input2 = fs.readFileSync('./14.txt',{encoding: 'utf-8'}).split('\n').map(e=>{
    if(e[0] === 'm' && e[1] === 'a'){
        return ['mask',e.substr(7)]; 
    }else{
        e = e.split(' = ');
        e[0] = e[0].substr(3);
        e[0] = e[0].slice(0,-1).slice(1);
        return [parseInt(e[0]),parseInt([e[1]])]
    }
});

let mask2 = '';
let memory2 = {};

input2.forEach(instruction =>{
    if(instruction[0] === 'mask'){
        mask2 =instruction[1].split('');
    }else{
        let binaryKey = instruction[0].toString(2).padStart(36,0).split('');
        // APPLY MASK TO MEMORY BINARY
        for(let i = 0 ; i < 36 ; i++){
            if(mask2[i] === 'X' || mask2[i] === '1'){
                binaryKey[i] = mask2[i];
            }
        }
        // GENERATE ALL POSSIBLE KEYS AND STORE IN MEMORY 2 OBJECT
        let check = 1;
        let possiblesKeys = [binaryKey.map(e=>e)];
        while(check !== 0){
            check = 0;
            possiblesKeys.forEach((key, index) =>{
                let x = key.indexOf('X');
                     if( x !== -1){
                        key[x] = '0';
                        possiblesKeys.push(key.map(e=>e));
                        key[x] = '1';
                        possiblesKeys.push(key.map(e=>e));
                        check++;
                        possiblesKeys.splice(index,1)
                    }
            })
        }
        possiblesKeys.forEach(key =>{
            let decimal = parseInt(key.join(''),2);
            memory2[decimal] = instruction[1]
        })
    }
})
let sum2 = 0;
Object.keys(memory2).forEach(key=>{
    sum2 += memory2[key];
})
console.log('PART TWO : ' + sum2)