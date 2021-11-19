let expenses = ['1933','1963','1924','1832','1949','1826','1681','1548','1881','1973','1558','1979','1803','1975','1867','1934','1986','1220','1878','1985','2006','1535','1522','1884','1380','1922','1905','1582','1456','1877','1959','1953','634','1875','366','1968','1887','1848','1779','1894','1606','1429','1900','1309','2007','1944','1901','1559','1484','1996','1837','1892','1989','1684','1952','1990','1974','1890','1883','1993','1592','1889','1735','1577','1568','1957','1980','1537','1992','1950','1836','1397','1660','2010','1627','1991','1888','107','1977','1898','1532','1726','1899','1960','1962','2000','1903','1937','1931','1895','1868','1600','1926','1946','1964','1956','1915','1506','1580','1984','1870','2008','1885','1503','1927','841','1997','2002','1869','1874','1906','1911','508','1718','1961','1909','1914','1940','1879','1965','1929','1932','1579','1902','1783','1983','166','1972','2003','2005','1918','1893','1427','1945','1982','1847','1425','1941','1958','1842','1928','1840','1789','1654','1665','1387','1908','1891','1873','1839','1943','1616','1490','144','1981','1988','1853','1994','42','1954','1762','1792','1896','1907','1976','1886','1971','1998','1912','1967','1857','1951','1925','1921','1518','1593','2004','1999','1571','1923','463','1897','1861','1467','1920','1504','2009','1942','1995','1947','1872','1969','1910','1955','1939','1966','1687','1827','675','1520'];
//let expenses =['1721','979','366','299','675','1456']
let sum  = 2020;

expenses = expenses.map(number => {
    return parseInt(number);
})
expenses.sort(function(a,b){return a-b});
console.log(expenses);



function checkTT(arr){
    arr.sort(function(a,b){return a-b});
    let l = arr.length-1;
    let i = 0;
    let couple = [];
    arr.forEach(number => {
        let diff = sum - number;

        for (l; l > i ; l--) {
            if (arr[l] === diff){
                couple = [number,arr[l]];
                break;
            }
        }

        i++;
    });
   console.log(couple[0]*couple[1]);
}

function checkTTS(arr,somma){
    let results = null;
    arr.forEach(element => {
        let toFind = somma - element;
        arr.forEach(element2 =>{
            if (toFind === element2){
                results = [element,element2];
            }
        })
    })
    return results;
}

function checkThree(arr){
 let found = false
    arr.forEach(number =>{

        let newSum = sum - number;
        let newArr = arr.map(element =>{if (element !== number ){return element}});
        //console.log(newArr);
        let result = checkTTS(newArr,newSum);

        //console.log(`NUMERO:${number} NEWSUM:${newSum} RESULT:${result}`);

        if(result && found === false){
            console.log(number);
            console.log(result[0]);
            console.log(result[1]);
            console.log(number*result[0]*result[1])
            found = true;
        }
    })
}

//checkTT(expenses);
//console.log(checkTTS(expenses,sum));
checkThree(expenses);

  




