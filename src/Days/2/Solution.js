import rawData from "./input.txt"
import {useState, useEffect} from "react"
import * as Utils from "./../Utils";




export function Solution2() {
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
        
        
        let pos1 = [0,0];
        let pos2 = [0,0];
        let aim = 0;
        
        data.forEach((line) => {
            const c = line.substring(0,line.search(/ /));
            const n = parseInt(line.substring(line.search(/ /)+1));
            
            if(c === "forward") {
                pos1[0] += n;
                
                pos2[0] += n;
                pos2[1] += aim*n;
            }
            if(c === "down"){
                pos1[1] += n;
                aim+=n;
            }
            if(c === "up") {
                pos1[1] -= n;
                aim-=n;
            }
        });
        
        setAns1(pos1[0] * pos1[1]);
        setAns2(pos2[0] * pos2[1]);
        
    }
    
    
    return (
        <div>
            <div>{answer1}</div>
            <div>{answer2}</div>
        </div>
    )
}

