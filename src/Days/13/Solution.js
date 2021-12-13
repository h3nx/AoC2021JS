import rawData from "./input.txt"
import {useState, useEffect} from "react"
import * as Utils from "./../Utils";




export function Solution13() {
    // eslint-disable-next-line
    const [answer1, setAns1] = useState(-1);
    // eslint-disable-next-line
    const [answer2, setAns2] = useState([]);
    
    useEffect(()=> {
        fetch(rawData)
        .then(r => r.text())
        .then(text => {
            solve(Utils.splitByNewEmptyLine(text));
        });
        
    },[]);
    
    function solve(data) {
        // console.log(data);
        // console.log(data[0])
        // console.log(data[1])
        
        const d1  = Utils.SplitByNewLine(data[0]);
        const d2  = Utils.SplitByNewLine(data[1]);
        
        console.log(d1, d2);
        let coords = d1.map((line)=>{return Utils.stringToIntegerArr(line.split(","))})
        let folds = d2.map((line)=> {return line.split(" ")[2].split("=")});
        
        console.log(coords[0]);
        console.log(folds[0]);
        
        let unique = [];
        folds.forEach((fold)=> {
            const nr = parseInt(fold[1]);
            const way = fold[0]
            // console.log(way, nr);
            
            for(let i = 0; i < coords.length; i++) {
                let diff = 0;
                if(way === "x") {
                    diff = coords[i][0]-nr;
                    // console.log("pos", coords[i][1],"fold", nr,"diff", diff)
                    if(diff > 0) {
                        let newpos = [coords[i][0]-diff*2,coords[i][1]];
                        coords[i] = newpos;
                        // console.log(coords[i], newpos);
                    }
                } else if(way === "y") {
                    diff = coords[i][1]-nr;
                    // console.log("pos", coords[i][1],"fold", nr,"diff", diff)
                    if(diff > 0) {
                        let newpos = [coords[i][0],coords[i][1]-diff*2];
                        coords[i] = newpos;
                        // console.log(coords[i], newpos);
                    }
                }
            }
            coords = unique = uniqueStuff(coords);
            // console.log(coords,unique);
        })
        
        
        console.log(unique);
        let sum1 = unique.length;
        setAns1(sum1);
        
        
        
        let print = makemap(unique);
        
        
        
        let sum2 = Utils.printTable3(print,print[0].length,print.length);
        console.log({sum2});
        // let s = Utils.SplitByNewLine(sum2);
        let s = sum2.split("\n");
        console.log(s);
        setAns2(s);
    }
    
    
    function makemap(arr) {
        let size = [0,0];
        
        arr.forEach((line) => {
            if(line[0]>size[0])
                size[0] = line[0];
            if(line[1]>size[1])
                size[1] = line[1];
        })
        
        let m = [];
        
        for(let y = 0; y <= size[1]; y++) {
            m.push([]);
            for(let x = 0; x <= size[0]; x++) {
                m[y].push(".");
            }
        }
        
        arr.forEach((line) => {
            console.log(line);
            m[line[1]][line[0]] = "▓";
        });
        
        
        console.log("size",size);
        return m;
    }
    function uniqueStuff(arr) {
        let uniqueChars = [];
        arr.forEach((c) => {
            if (uniqueChars.find((pos)=>{return c[0] === pos[0] && c[1] === pos[1]}) === undefined) {
                uniqueChars.push(c);
            }
        });
        return uniqueChars;
    }
    
    
    
    
    return (
        <div>
            <div>{answer1}</div>
            <code>{
                answer2.map((line)=>{return(<div key={line} style={{letterSpacing:"0px"}}>{line}</div>)})
            }</code>
        </div>
    )
}

