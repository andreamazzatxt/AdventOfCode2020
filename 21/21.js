const fs = require('fs');
const colors = require('colors');
let input = fs.readFileSync('./21.txt','utf-8').split('\n');
let food = [];
input.forEach(line =>{
    let ingredients = line.split(' (')[0].split(' ');
    let allergens = line.split(' (')[1].substring(9);
    allergens = allergens.substring(0,allergens.length-1).split(', ')
    food.push({
        ingredients: ingredients,
        allergens: allergens,
    })
})
let foodFree = [];
function findFreeFood(food){
    let possible = {}
    food.forEach(food =>{
        food.allergens.forEach(allergen=>{
                if(possible[allergen] === undefined){
                    possible[allergen] = [food.ingredients]

                }else{ 
                       possible[allergen].push(food.ingredients);
                    }
        })
    })

    let possibility = {}
   for (key in possible){
       let count = {}
       let target = possible[key].length;
       possible[key].forEach(line=>{
           line.forEach(ingredient =>{
               if(count[ingredient] === undefined){
                   count[ingredient] = 1;
               }else{
                   count[ingredient]++;
               }
           })
        })
        for(ingredient in count){
            if(count[ingredient] === target){
                if(possibility[key] === undefined){
                    possibility[key] = [ingredient];
                }else{
                    possibility[key].push(ingredient);
                }
            }else{
                foodFree.push(ingredient);
            }
        }
   }
       //find unique allergen ingredients
        let finish = 0;
        let unique =[]
        while(finish !== 5){
        unique = [];
        for(allergen in possibility){
            if(possibility[allergen].length === 1){
                unique.push(possibility[allergen][0]);
            }
        }
        unique.forEach(ingredient =>{
            for(allergen in possibility){
            if(possibility[allergen].length > 1){
                let index = possibility[allergen].indexOf(ingredient);
                if(index !== -1){
                    possibility[allergen].splice(index,1);
                }
            }
        }})
        finish++
    }

      let countFree= 0;
    food.forEach(food =>{
        food.ingredients.forEach(ingredient =>{
            let match = 0;
            unique.forEach(alergic =>{
                if(ingredient === alergic){
                    match++;
                }
            })
            if(match === 0){
                countFree++;
            }
        })
    })
        console.log('Part One : '.rainbow.bold +countFree)

    // part Two
    let listInOrder = [];
    for (key in possibility){
        listInOrder.push(key+' '+possibility[key])
    };
    listInOrder.sort()
    listInOrder = listInOrder.map(line =>{
        return line.split(' ')[1]
    })
    listInOrder = listInOrder.join();
    console.log('Part Two :'.rainbow.bold + listInOrder)


}

findFreeFood(food);