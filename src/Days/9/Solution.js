import rawData from "./input.txt"
import {useState, useEffect} from "react"
import * as Utils from "./../Utils";




export function Solution9() {
    // eslint-disable-next-line
    const [answer1, setAns1] = useState(-1);
    // eslint-disable-next-line
    const [answer2, setAns2] = useState(-1);
    
    useEffect(()=> {
        fetch(rawData)
        .then(r => r.text())
        .then(text => {
            solve(Utils.SplitByNewLine(text));
        });
        
    },[]);
    
    function solve(data) {
        console.log(data);

        let m = data.map((line) => {
            return line.split("");
        })
        console.log(m);
        let lowPoints = [];
        let values = [];
        for(let y = 0; y < m.length; y++) {
            for(let x = 0; x < m[y].length; x++) {
                const center = m[y][x];
                // console.log(center, x, y,  m[y]);
                if(y > 0 ) {
                    if(center >= m[y-1][x]) {
                        continue;
                    }
                }
                if(y < m.length-1) {
                    if(center >= m[y+1][x]) {
                        continue;
                    }
                }
                if(x > 0 ) {
                    if(center >= m[y][x-1]) {
                        continue;
                    }
                }
                if(x < m[y].length-1) {
                    if(center >= m[y][x+1]) {
                        continue;
                    }
                }
                lowPoints.push([x, y]);
                values.push(parseInt(m[y][x])+1);
            }
        }
        console.log(lowPoints);
        console.log(values);
        
        let sum = 0;
        values.forEach((nr)=> {sum += nr});
        setAns1(sum);
        
        
        let lowPoints2 = [];
        let basins = [];
        for(let y = 0; y < m.length; y++) {
            for(let x = 0; x < m[y].length; x++) {
                if("9" === m[y][x])
                    continue;
                if("" === m[y][x])
                    continue;
                let basin = [];
                findBasin(m,basin,x,y)
                basins.push(basin);
            }
        }
        basins.sort((a,b) => b.length-a.length);
        let sum2 = basins[0].length;
        for(let i = 1; i < 3; i++) {
            sum2 *= basins[i].length;
        }
        
        console.log(sum2, basins);
        setAns2(sum2);
    }
    
    
    function findBasin(m, basin, x, y) {
        if("9" === m[y][x])
            return;
        if("" === m[y][x])
            return;
        basin.push(parseInt(m[y][x]));
        m[y][x] = "";
        if(y > 0 ) {
            findBasin(m,basin,x,y-1);
        }
        if(y < m.length-1) {
            findBasin(m,basin,x,y+1);
        }
        if(x > 0 ) {
            findBasin(m,basin,x-1,y);
        }
        if(x < m[y].length-1) {
            findBasin(m,basin,x+1,y);
        }
    }
    
    
    
    return (
        <div>
            <div>{answer1}</div>
            <div>{answer2}</div>
        </div>
    )
}

