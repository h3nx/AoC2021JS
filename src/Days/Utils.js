

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