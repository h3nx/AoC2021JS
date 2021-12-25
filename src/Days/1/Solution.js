import rawData from "./input.txt"
import {useState, useEffect} from "react"
import * as Utils from "./../Utils";




export function Solution1() {
    const [answer1, setAns1] = useState(-1);
    const [answer2, setAns2] = useState(-1);
    
    useEffect(()=> {
        fetch(rawData)
        .then(r => r.text())
        .then(text => {
            solve(Utils.SplitByNewLine(text));
        });
        
    },[]);
    
    function solve(data) {
        data = Utils.stringToIntegerArr(data);
        console.log(data);
        
        let count = -1; 
        let previous = 0;
        data.forEach(element => {
            if(element > previous)
                count++;
            previous = element;
        });
        setAns1(count);
        
        count = 0;
        previous = 0;
        
        for(let i = 0; i < data.length-3; i++) {
            let sum = data[i] + data[i+1] + data[i+2];
            if(sum > previous)
                count++;
            previous = sum;
        }
        setAns2(count);
    }
    
    
    return (
        <div>
            <div>{answer1}</div>
            <div>{answer2}</div>
        </div>
    )
}

