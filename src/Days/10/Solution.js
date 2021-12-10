import rawData from "./input.txt"
import {useState, useEffect} from "react"
import * as Utils from "./../Utils";




export function Solution10() {
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
        const lines = data.map((line)=> {return line.split("")});
        console.log(lines);
        
        /*
        
    ): 3 points.
    ]: 57 points.
    }: 1197 points.
    >: 25137 points.

        
        */ 
       let corrupted = [];
       let illegals = [];
        
        for(let i = 0; i < lines.length; i++) {
            
            let stack = [];
            for(let l = 0; l < lines[i].length; l++) {
                const char = lines[i][l];
                // console.log(i,l,char);
                if(char === "(" || char === "[" || char=== "{" || char === "<") {
                    stack.push(char);
                    // console.log(stack);
                } else {
                    const p = stack.pop();
                    // console.log(p, char);
                    if(p === "("){
                        if(char !== ")") {
                            illegals.push(char);
                            corrupted.push(i);
                            break;
                        }
                    }
                    if(p === "["){
                        if(char !== "]") {
                            illegals.push(char);
                            corrupted.push(i);
                            break;
                        }
                    }
                    if(p === "{"){
                        if(char !== "}") {
                            illegals.push(char);
                            corrupted.push(i);
                            break;
                        }
                    }
                    if(p === "<"){
                        if(char !== ">") {
                            illegals.push(char);
                            corrupted.push(i);
                            break;
                        }
                    }
                }
            }
            // console.log(i, corrupted, illegals);
            // console.log();
        }
        
        let sum = 0;
        illegals.forEach((char)=> {
            if(char === ")")
                sum+= 3;
            if(char === "]")
                sum+= 57;
            if(char === "}")
                sum+= 1197;
            if(char === ">")
                sum+= 25137;
        })
        setAns1(sum);
        
        
        const lines2 = lines.filter((lines,index)=> {
            if(corrupted.findIndex((i) => index === i) === -1)
            {
                return true;
            }
        })
        
        console.log(lines2);
        
        let rest = [];
        let scores = [];
        for(let i = 0; i < lines2.length; i++) {
            let sum2 = 0;
            rest.push([]);
            let stack = [];
            for(let l = 0; l < lines2[i].length; l++) {
                const char = lines2[i][l];
                if(char === "(" || char === "[" || char=== "{" || char === "<") {
                    stack.push(char);
                    // console.log(stack);
                } else {
                    const p = stack.pop();
                }
                
                
            }
            
            stack.forEach((char)=> {
                if(char === "(") {
                    rest[i].unshift(")");
                }
                if(char === "["){
                    rest[i].unshift("]");
                }
                if(char === "{"){
                    rest[i].unshift("}");
                }
                if(char === "<"){
                    rest[i].unshift(">");
                }
            })
            
            rest[i].forEach((char)=> {
                if(char === ")") {
                    sum2*=5;
                    sum2+=1;
                }
                if(char === "]"){
                    sum2*=5;
                    sum2+=2;
                    
                }
                if(char === "}"){
                    sum2*=5;
                    sum2+=3;
                    
                }
                if(char === ">"){
                    sum2*=5;
                    sum2+=4;
                }
            })
            if(sum2 > 0) {
                scores.push(sum2);
                console.log(sum2, stack,rest[i]);
            }
            
            
        }
        scores.sort((a,b)=>a-b);
        console.log(scores);
        
        
        console.log(scores.length, scores.length/2, Math.floor(scores.length/2)+1);
        setAns2(scores[Math.floor(scores.length/2)]);
    }
    
    
    return (
        <div>
            <div>{answer1}</div>
            <div>{answer2}</div>
        </div>
    )
}

