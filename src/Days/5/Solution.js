import rawData from "./input.txt"
import {useState, useEffect} from "react"
import * as Utils from "./../Utils";




export function Solution5() {
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
        // console.log(data);
        let pairData = Utils.splitBySpace(data);
        // console.log(pairData);
        pairData.forEach((arr,index)=> {pairData[index].splice(1,1)})
        // console.log(pairData);
        
        const size = 1000;
        let map = [];
        for (var i = 1; i <= size*size; i++) {
            map.push(0);
         }
        // console.log(map);
        
        // too low 14721
        
        pairData.forEach((pair)=> {
            let [x1,y1] = pair[0].split(",");
            let [x2,y2] = pair[1].split(",");
            [x1,x2] = [parseInt(x1),parseInt(x2)];
            [y1,y2] = [parseInt(y1),parseInt(y2)];
            // console.log(x1,y1,":",x2,y2);
            
            // if(x1 === x2 && y1 === y2) {
            //     map[y1*size+x1] += 1;
            // }
            if(x1 === x2) {
                const min = y1 <= y2 ? y1 : y2;
                const max = y1 <= y2 ? y2 : y1;
                // console.log("x", )
                for(let i = min; i <= max; i++) {
                    map[i*size+x2] += 1;
                }
                
            }
            else if(y1 === y2) {
                const min = x1 <= x2 ? x1 : x2;
                const max = x1 <= x2 ? x2 : x1;
                
                for(let i = min; i <= max; i++) {
                    map[y1*size+i] += 1;
                }
            }
        })
        
        
        let total = 0;
        map.forEach((element)=>{
            if(element > 1) {
                total++;
            }
        })
        setAns1(total);
        // console.log(total, map);
        pairData.forEach((pair)=> {
            
            let [x1,y1] = pair[0].split(",");
            let [x2,y2] = pair[1].split(",");
            [x1,x2] = [parseInt(x1),parseInt(x2)];
            [y1,y2] = [parseInt(y1),parseInt(y2)];
            if((x1+y1 === x2+y2)||(x1-y1 === x2-y2)){
                const [minx, miny] = x1 <= x2 ? [x1,y1] : [x2,y2];
                const [maxx, maxy] = x1 <= x2 ? [x2,y2] : [x1,y1];
                
                const [dx,dy] = [Math.sign(maxx-minx),Math.sign(maxy-miny)];
                
                // console.log(minx,miny,":",maxx,maxy, "__", dx,dy);
                if(dy === -1) {
                    for(let i = minx; i <= maxx; i++) {
                        map[(miny-i+minx)*size+i] += 1;
                        // console.log("   ",i,miny-i+minx);
                    }
                    
                } else {
                    for(let i = minx; i <= maxx; i++) {
                        map[(miny+i-minx)*size+i] += 1;
                        // console.log("___",i,miny+i-minx);
                    }
                }
            }
        });
        
        total = 0;
        map.forEach((element)=>{
            if(element > 1) {
                total++;
            }
        })
        setAns2(total);
    }
    
    
    
    return (
        <div>
            <div>{answer1}</div>
            <div>{answer2}</div>
        </div>
    )
}

