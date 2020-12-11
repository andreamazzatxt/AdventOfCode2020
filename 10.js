let adapters = `67
118
90
41
105
24
137
129
124
15
59
91
94
60
108
63
112
48
62
125
68
126
131
4
1
44
77
115
75
89
7
3
82
28
97
130
104
54
40
80
76
19
136
31
98
110
133
84
2
51
18
70
12
120
47
66
27
39
109
61
34
121
38
96
30
83
69
13
81
37
119
55
20
87
95
29
88
111
45
46
14
11
8
74
101
73
56
132
23`.split("\n");

adapters = adapters.map(e => parseInt(e))
// PART ONE
function jolts(arr){
    arr.push(0);
    arr.sort((a,b) =>{return a-b});
    arr.push(arr[arr.length-1]+3);
    console.log(arr);
    let count1 = 0;
    let count2 = 0;
    let count3 = 0;
    for(let i = 0; i < arr.length -1 ; i++){
        let diff = arr[i+1] - arr[i];
        switch(diff){
            case 1:
                count1++;
                break;
            case 2:
                count2++;
                break;
            case 3:
                count3++;
                break;
        }
    }
    return (count1*count3);
}
//PART TWO
function waysToconnect(arr){
    arr.push(0);
    arr.sort((a,b) =>{return a-b});
    arr.push(arr[arr.length-1]+3);
    let options = {};
    arr.forEach(e =>{
        let toConnect1 = e+1;
        let toConnect2 = e+2;
        let toConnect3 = e+3;
        options[e] =[[],0];
        arr.forEach(element => {
            switch(element){
                case toConnect1:
                    options[e][0].push(toConnect1);
                    break; 
                case toConnect2:
                    options[e][0].push(toConnect2);
                    break; 
                case toConnect3:
                    options[e][0].push(toConnect3);
                    break;
            }
        });
    })

    arr.sort((a,b) =>{return b-a});
    console.log(options)
    let first = false;
    arr.forEach(e => {
        if(first===false){
          first = true;
         options[e][1]++;   
        }else{
            let sum  = 0;
            options[e][0].forEach(op =>{
                sum += options[op][1]
            })
            options[e][1] = sum;
        };       
    })
        console.log(options)
    }

waysToconnect(adapters);