import rawData from "./input.txt"
import {useState, useEffect} from "react"
import * as Utils from "./../Utils";




export function Solution11() {
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
    
    function increment(map) {
        for(let y = 0; y < map.length; y++) {
            for(let x = 0; x < map.length; x++) {
                map[y][x]++;
            }
        }
    }
    function doFlash(map, x,y) {
        map[y][x] = 0;
        if(y < map[y].length-1) {
            if(map[y+1][x] > 0) {
                map[y+1][x] += 1;
            }
        }
        if(y > 0){
            if(map[y-1][x] > 0) {
                map[y-1][x] += 1;
            }
        }
        if(x < map.length-1) {
            if(map[y][x+1] > 0) {
                map[y][x+1]  += 1;
            }
        }
        if(x > 0) {
            if(map[y][x-1] > 0) {
                map[y][x-1]  += 1;
            }
        }
        if(y < map[y].length-1 && x < map.length-1){
            if(map[y+1][x+1] > 0) {
                map[y+1][x+1]  += 1;
            }
        }
        if(y < map[y].length-1 && x > 0) {
            if(map[y+1][x-1] > 0) {
                map[y+1][x-1]  += 1;
            }
        }
        if(y > 0 && x < map.length-1) {
            if(map[y-1][x+1] > 0) {
                map[y-1][x+1]  += 1;
            }
        }
        if(y > 0 && x > 0) {
            if(map[y-1][x-1] > 0) {
                map[y-1][x-1]  += 1;
            }
        }
        return 1;
    }
    function doFlashes(map) {
        let f = 0;
        let foundFlash = false;
        let iterations = 0;
        do {
            foundFlash = false;
            // console.log(iterations);
            for(let y = 0; y < map.length; y++) {
                for(let x = 0; x < map[y].length; x++) {
                    if(map[y][x] > 9) {
                        // console.log("found flash", x, y);
                        foundFlash = true;
                        f += doFlash(map, x, y);
                    }
                }
            }
            iterations += 1;
        } while(foundFlash === true)
        return f;
    }
    function reset(map) {
        for(let y = 0; y < map.length; y++) {
            for(let x = 0; x < map.length; x++) {
                if(map[y][x] >= 9)
                    map[y][x] = 0;
            }
        }
    }
    
    function solve(data) {
        let found2 = false;
        console.log(data);
        let m = data.map((line)=>{return line.split("")});
        console.log(m);
        let flashes = 0;
        let step1Flashes = 0;
        for(let steps = 0; steps < 10000; steps++) {
            if(steps === 100)
                step1Flashes = flashes;
            // Utils.printTable2(m,m.length-1);
            increment(m);
            flashes += doFlashes(m);
            
            let all = true;
            for(let y = 0; y < m.length; y++) {
                for(let x = 0; x < m.length; x++) {
                    if(m[y][x] > 0)
                        all = false;
                }
            }
            if(all) {
                if(found2 === false) {
                    found2 = true;
                    setAns2(steps+1);
                }
                if(steps >= 100)                
                    break;
            }
            
            
            
            // reset(m);
        }
        
        
        setAns1(step1Flashes);
        
        
        
        
    }
    
    
    return (
        <div>
            <div>{answer1}</div>
            <div>{answer2}</div>
        </div>
    )
}

/*
            let foundFlash = false;
            for(let y = 0; y < m.length; y++) {
                for(let x = 0; x < m.length; x++) {
                    increment(m,x,y);
                    
                    
                }
            }
            while(foundFlash) {
                foundFlash = false;
                for(let y = 0; y < m.length; y++) {
                    for(let x = 0; x < m.length; x++) {
                        
                    
                    
                    }
                }
                
            }
            */