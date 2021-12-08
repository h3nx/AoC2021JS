import rawData from "./input.txt"
import {useState, useEffect} from "react"
import * as Utils from "./../Utils";




export function Solution7() {
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
        let nr = Utils.stringToIntegerArr(data[0].split(",")).sort((a,b)=>a-b);
        console.log(nr);
        
        const avg = Math.ceil(Utils.getAverage(nr));
        console.log(avg);
        
        const med = Utils.getMedian(nr);
        console.log(med);
        
        
        let sum = 0;
        
        
        nr.forEach((element)=> {
            let s =  Math.abs(element-med);
            sum+=s;
            // console.log(element, s);
        })
        setAns1(sum);
        sum = 0;
        nr.forEach((element)=> {
            let s =  Math.abs(element-avg+1);
            for(let i = 1; i<= s; i++) {
                sum+=i;
                
            }
            // console.log(element, s);
        });
        setAns2(sum);
        
    }
    
    
    return (
        <div>
            <div>{answer1}</div>
            <div>{answer2}</div>
        </div>
    )
}

