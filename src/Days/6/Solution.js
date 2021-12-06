import rawData from "./input.txt"
import {useState, useEffect} from "react"
import * as Utils from "./../Utils";




export function Solution6() {
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
        
        let nrs = data.map((str)=> {
            return str.substring(15);
        })
        console.log(nrs);
        let temp = nrs.map((str)=>{return str.split(",")});
        console.log(temp);
        let fishAll = temp.map((arr)=>{return Utils.stringToIntegerArr(arr)});
        console.log(fishAll);
        
        let fish = Utils.stringToIntegerArr(data[0].split(","));
        let fish2Input = [...fish];
        // console.log(fish,data[0]);
        for(let day = 0; day <= 79; day++) {
            // console.log(day, fish);
            if(day%10===0)
                console.log(day, fish.length);
            const initialLength = fish.length;
            for(let i = 0; i < initialLength; i++) {
                if(fish[i] === 0) {
                    fish.push(8);
                    fish[i] = 6;
                } else {
                    fish[i]--;
                }
            }
        }
        
        setAns1(fish.length);
        
        
        let fish2 = [0,0,0,0,0,0,0,0,0];
        
        for(let i = 0; i < fish2Input.length; i++) {
            fish2[fish2Input[i]-1]+=1;
        }
        console.log("days", fish2);
        
        for(let day = 1; day <= 255; day++) {       
            let prev = [...fish2];
            let sum = 0; 
            for(let i = 0; i < 9; i++) {
                sum += fish2[i];
            }
            fish2[8] = prev[0];
            fish2[7] = prev[8];
            fish2[6] = prev[7]+prev[0];
            fish2[5] = prev[6];
            fish2[4] = prev[5];
            fish2[3] = prev[4];
            fish2[2] = prev[3];
            fish2[1] = prev[2];
            fish2[0] = prev[1];
            // console.log(sum, fish2, prev);
            
        }
        let sum = 0; 
        for(let i = 0; i < 9; i++) {
            sum += fish2[i];
        }
        setAns2(sum)
    }
    
    
    return (
        <div>
            <div>{answer1}</div>
            <div>{answer2}</div>
        </div>
    )
}

