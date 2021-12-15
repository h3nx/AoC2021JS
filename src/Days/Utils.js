

export function splitByNewEmptyLine(data) {
    return data.split(/\n\s*\n/);
}
export function SplitByNewLine(data) {
    return data.split(/\r\n/);
}
export function ReplaceNewlineWithSpace(str) {
    return str.replace(/\n|\r/g,' ');
}

export function reverseString(str) {
    return str.split("").reverse().join("");
}

export function stringToIntegerArr(arr) {
    return arr.map((item) => {return parseInt(item)});
}

export function splitBySpace(arr) {
    return arr.map((line) => {return line.split(" ")});
}

export function printTable(arr,size) {
    for(let y = 0; y < size; y++) {
        let line = "";
        for(let x = 0; x < size; x++) {
            line+=arr[y*size+x]+"\t";
        }
        console.log(line);
    }
}
export function printTable2(arr,size) {
    console.log(" ");
    for(let y = 0; y < size; y++) {
        let line = "";
        for(let x = 0; x < size; x++) {
            if(arr[y][x]===0)
            line+="_"+"";
            else
            line+=arr[y][x]+"";
        }
        console.log(line);
    }
}
export function printTable3(arr,sizex,sizey) {
    console.log(" ");
    let total = "";
    for(let y = 0; y < sizey; y++) {
        let line = "";
        for(let x = 0; x < sizex; x++) {
            if(arr[y][x]===0)
            line+="_"+"";
            else
            line+=arr[y][x]+"";
        }
        total += line+"\n";
        console.log(line);
    }
    return total
}
export function printTable15(arr,sizex,sizey) {
    console.log(" ");
    let total = "";
    for(let y = 0; y < sizey; y++) {
        let line = "";
        for(let x = 0; x < sizex; x++) {
            line+=arr[y][x]+"";
            if(x%10===9)
                line+=" ";
        }
        line += "\n";
        if(y%10===9)
            line+="\n";
        total += line;
        console.log(line);
    }
    return total
}
export function twoDtoOneD(x, y, width) {
    return y*width+x;
}

export function getNeighbours2d(x, y, xSize, ySize, corners = false) {
    let n = [];
    
    for(let d = 0; d < 360; d += corners ? 45 : 90) {
        let [xx,yy] = [
            x+Math.round(Math.sin(d * (Math.PI / 180))),
            y+Math.round(Math.cos(d * (Math.PI / 180)))
        ];
        // console.log(xx,yy);
        if(0 <= (xx) && (xx) <= xSize && 0 <= (yy) && (yy) <= ySize)
            n.push([xx,yy]);
    }
    return n;
}




export function getAverage(arr) {
    let sum = 0;
    arr.forEach((nr)=>sum+=nr);
    console.log(sum,arr.length);
    return sum/arr.length;
}
export function getMedian(arr) {
    return arr[Math.floor(arr.length/2)];
}

// day 8, match chars in matching against str
export function matchChars(str, matching) {
    let count = 0;
    for(let i =0; i < matching.length;i++) {
        if(str.indexOf(matching[i]) > -1) {
            count++;
        }
    }
    // console.log(count, matching.length);
    return matching.length === count;
}
// day 8, match chars in matching against str with same length req
export function matchChars2(str, matching) {
    let count = 0;
    if(str.length !== matching.length) 
        return false;
    for(let i = 0; i < matching.length; i++) {
        if(str.indexOf(matching[i]) > -1) {
            count++;
        }
    }
    // console.log(count, matching.length);
    return matching.length === count;
}


export function isLower(char) {
    return char === char.toLowerCase();
}
export function isUpper(char) {
    return char === char.toUpperCase();
}









/*

be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce
*/