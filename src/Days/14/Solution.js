import rawData from "./input.txt"
import {useState, useEffect} from "react"
import * as Utils from "./../Utils";




export function Solution14() {
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
          
        const d1  = Utils.SplitByNewLine(data[0])[0];
        const rules  =  Utils.SplitByNewLine(data[1]).map((line)=> {
            return line.split(" -> ");
        });
        console.log(d1, rules);
        
        function uniqueStuff(arr) {
            let uniqueChars = [];
            arr.forEach((c) => {
                if (uniqueChars.find((pos)=>{return c === pos}) === undefined) {
                    uniqueChars.push(c);
                }
            });
            return uniqueChars;
        }
        let current = d1.substring(0,d1.length-1);
        for(let iter = 0; iter < 10; iter++) {
            console.log("           iterations",iter, "resulting length",current.length);
            let toAdd = [];   
            // eslint-disable-next-line
            rules.forEach((line)=>{
                let i = current.indexOf(line[0]);
                while(i > -1) {
                    toAdd.push([line[1], i]);
                    i = current.indexOf(line[0],i+1);
                }
            });
           
            
            toAdd = toAdd.sort((a,b)=>a[1]-b[1]);
            let offset =0;
            // eslint-disable-next-line
            toAdd.forEach((line)=> {
                current = [current.slice(0, line[1]+1+offset), line[0], current.slice(line[1]+1+offset)].join('');
                offset++;
            })
            
        }
        console.log(current);
        
        const chars = uniqueStuff(current.split(""));
        console.log(chars);
        
        function countOcc(string, char) {
            return (string.split(char).length - 1);
        } 
        
        let totalcount = chars.map((c)=>{
            return countOcc(current,c);
        })
        totalcount = totalcount.sort((a,b)=>b-a);
        console.log(totalcount);
        // let coords = d1.map((line)=>{return Utils.stringToIntegerArr(line.split(","))})
        // let folds = d2.map((line)=> {return line.split(" ")[2].split("=")});
        setAns1(totalcount[0]-totalcount[totalcount.length-1]);
        
        
        
        
        let orig = d1.substring(0,d1.length-1);
        let pairs = [];
        let charCount = [];
        rules.forEach((line)=>{
            if(pairs[line[0]] === undefined)
                pairs[line[0]] = 0;
            if(charCount[line[1]] === undefined)
                charCount[line[1]] = 0;
        });
        for(let sad = 0; sad < orig.length; sad++)
            charCount[orig[sad]]++;
        rules.forEach((line)=>{
            let i = orig.indexOf(line[0]);
            while(i > -1) {
                pairs[line[0]]+=1;
                i = orig.indexOf(line[0],i+1);
            }
        });
        for (var k in pairs){
            if (pairs.hasOwnProperty(k)) {
                console.log(k, pairs[k]);
            }
        }
        for (var k in charCount){
            if (charCount.hasOwnProperty(k)) {
                console.log(k, charCount[k]);
            }
        }
        
        
        for(let steps = 0; steps < 40; steps++) {
            console.log("STEPS",steps);
            let toAdd = [];
            rules.forEach((line)=>{
                let count = pairs[line[0]];
                if(count > 0) {
                    toAdd.push({pair:line,nr:count});
                }
            });
            
            console.log("toAdd",toAdd);
            // eslint-disable-next-line
            toAdd.forEach((pair)=> {
                
                pairs[pair.pair[0]]-=pair.nr;
                const c0 = pair.pair[0][0];
                const c1 = pair.pair[0][1];
                charCount[pair.pair[1]]+=pair.nr;
                pairs[c0+pair.pair[1]]+=pair.nr;
                pairs[pair.pair[1]+c1]+=pair.nr;
            });
            
        }
        // for (var k in pairs){
        //     if (pairs.hasOwnProperty(k)) {
        //          console.log(k,pairs[k]);
        //     }
        // }
        
        let p2sum = [];
        console.log("CHARCOUNT");
        for (var k in charCount){
            if (charCount.hasOwnProperty(k)) {
                console.log(k, charCount[k]);
                p2sum.push(charCount[k]);
            }
        }
        console.log(p2sum);
        p2sum = p2sum.sort((a,b)=>b-a);
        
        let sum2 = p2sum[0]-p2sum[p2sum.length-1];
        setAns2(sum2);
    }
    
    
    return (
        <div>
            <div>{answer1}</div>
            <div>{answer2}</div>
        </div>
    )
}

