import rawData from "./input.txt"
import {useState, useEffect} from "react"
import * as Utils from "./../Utils";




export function Solution4() {
    // eslint-disable-next-line
    const [answer1, setAns1] = useState(-1);
    // eslint-disable-next-line
    const [answer2, setAns2] = useState(-1);
    
    useEffect(()=> {
        fetch(rawData)
        .then(r => r.text())
        .then(text => {
            solve(Utils.splitByNewEmptyLine(text));
        });
        
    },[]);
    
    function solve(data) {
        console.log(data);
        data = data.map((str) => {return Utils.ReplaceNewlineWithSpace(str)});
        const draws = data[0].split(",");
        console.log(draws);
        data.splice(0,1);
        data = data.map((line)=>{return line.replace(/ +/g,',').replace(/,+/g,",")});
        console.log(data);
        
        // data = data.map((line)=>{return line.replace(/,,,/,",").replace(/,,/,",")});
        let nr = data.map((line)=>{return line.split(",").filter((nr)=>nr===""?false:true)});
        // console.log(data, draws);
        console.log(nr);
        
        
        for(let i = 0; i < draws.length; i++) {
            nr.forEach((table, ind)=> {
                nr[ind] = table.map((index) => {return index === draws[i]?"":index});
            });
            let w = [];
            let s = 0;
            for(let x = 0;x < nr.length; x++) {
                if(checkIfWinner(nr[x])) {
                    w.push(x);
                    if(nr.length === 1) {
                        let sum = returnSum(nr[0]);
                console.log("winner",i,"   ",sum, draws[i], sum*draws[i]);
                setAns2(sum*draws[i]);
                printTable(nr[0]);
                    }
                }
            }
            for(let l = w.length-1;l>=0; l--) {
                nr.splice(w[l],1);
                if(nr.length === 1) {
                    break;
                }
            }
            
        }
        
        console.log(nr);
        
    }
    
    function printTable(table) {
        for(let x = 0; x < 5; x++)
            console.log(
                table[x] === "" ? "x" : table[x+0],
                table[x+1*5] === "" ? "x" : table[x+1*5],
                table[x+2*5] === "" ? "x" : table[x+2*5],
                table[x+3*5] === "" ? "x" : table[x+3*5],
                table[x+4*5] === "" ? "x" : table[x+4*5],
                );
    }
    
    function returnSum(table) {
        let sum = 0;
        table.forEach((nr) => {
            if(nr !== "") {
                sum += parseInt(nr);
            }
        })
        return sum;
    }
    function checkIfWinner(table) {
        // console.log(table);
        for(let x = 0; x < 5; x++) {
            let lineX = 0;
            let lineY = 0;
            for(let y = 0; y < 5; y++) {
                if(table[x*5+y] === "") {
                    lineX++;
                }
                if(table[y*5+x] === "") {
                    lineY++;
                }
            }
            if(lineX === 5 || lineY === 5)
                return true;
        }
        return false;
    }
    
    return (
        <div>
            <div>{answer1}</div>
            <div>{answer2}</div>
        </div>
    )
}




/*


console.log(data);
        data = data.map((str) => {return Utils.ReplaceNewlineWithSpace(str)});
        const draws = data[0].split(",");
        console.log(draws);
        data.splice(0,1);
        data = data.map((line)=>{return line.replace(/ +/g,',').replace(/,+/g,",")});
        console.log(data);
        
        // data = data.map((line)=>{return line.replace(/,,,/,",").replace(/,,/,",")});
        let nr = data.map((line)=>{return line.split(",").filter((nr)=>nr===""?false:true)});
        // console.log(data, draws);
        console.log(nr);
        
        
        for(let i = 0; i < draws.length; i++) {
            nr.forEach((table, ind)=> {
                nr[ind] = table.map((index) => {return index === draws[i]?"":index});
            });
            let w = -1;
            let s = 0;
            for(let x = 0;x < nr.length; x++) {
                if(checkIfWinner(nr[x])) {
                    w = x;
                    s = returnSum(nr[x]);
                    console.log("winner",x,i,"   ",s, draws[i], s*draws[i]);
                }
            }
            if(w != -1)
                break;
            
        }
        console.log(nr);

*/