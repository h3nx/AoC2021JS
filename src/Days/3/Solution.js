import rawData from "./input.txt"
import {useState, useEffect} from "react"
import * as Utils from "./../Utils";




export function Solution3() {
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
        
        let asd = [0,0,0,0,0,0,0,0,0,0,0,0];
        // let asd = [0,0,0,0,0];
        
        let oxygen = [...data];
        let CO2 = [...data];
        let o = -1;
        asd.forEach((nr, index) => {
            // console.log(oxygen);
            
            let count = 0;    
            
            oxygen.forEach((line)=> {
                if(line[index] === "0") {
                    count -= 1;
                } else {
                    count += 1;
                }
            });
            const most = count >= 0 ?  "1":"0";
            // console.log(most);
            oxygen = oxygen.filter((line) => {
                return line[index] === most;
            });
        });
        // console.log(oxygen);
        
        // console.log("oxygen", parseInt(oxygen[0],2));
        let c = -1;
        asd.forEach((nr, index) => {
            // console.log(CO2);
            
            let count = 0;    
            
            CO2.forEach((line)=> {
                if(line[index] === "0") {
                    count -= 1;
                } else {
                    count += 1;
                }
            });
            const most = count < 0 ?  "1":"0";
            if(CO2.length == 1) {
                c = parseInt(CO2[0],2);
            }
            // console.log(most);
            CO2 = CO2.filter((line) => {
                return line[index] === most;
            });
        });
        
        if(o === -1) {
            o = parseInt(oxygen[0],2)
        }
        if(c === -1) {
            c = parseInt(CO2[0],2)
        }
        
        console.log(o,c, o*c);
        setAns2(o*c);
        
        console.log(CO2);
        console.log("CO2", parseInt(CO2[0],2));
        
        data.forEach((line)=> {
            for(let i = 0; i < 12; i++) {
                if(line[i] == "0") {
                    asd[i] -= 1;
                } else {
                    asd[i] += 1;
                }
            }
        })
        console.log(asd);
        
        let binG = asd.map((nr) => {return nr > 0 ?  "1":"0"});
        let binE = asd.map((nr) => {return nr < 0 ?  "1":"0"});
        
        console.log(binG, binE);
        console.log(parseInt(binG.join(""),2), parseInt(binE.join(""), 2));
        
        setAns1(parseInt(binG.join(""),2) * parseInt(binE.join(""),2));
        
    }
    
    
    return (
        <div>
            <div>{answer1}</div>
            <div>{answer2}</div>
        </div>
    )
}

