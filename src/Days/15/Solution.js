import rawData from "./input.txt"
import {useState, useEffect} from "react"
import * as Utils from "./../Utils";




export function Solution15() {
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
        const originalMap = data.map((line)=>{return Utils.stringToIntegerArr(line.split(""))});
        console.log(originalMap);
        
        let path = aStar(originalMap,[0,0],[originalMap[originalMap.length-1].length-1,originalMap.length-1]);
        console.log(path.getFullCost(),path);
        
        let sum1 = path.getFullCost();
        setAns1(sum1);
        
        let m5 = [];
        for(let y = 0; y < 5; y++) {
            originalMap.forEach((line)=> {
                m5.push([]);
                for(let x = 0; x < 5; x++) {
                    line.forEach((cost)=> {
                        let c = (cost+x+y);
                        if(c > 9)
                            c-=9;
                        m5[m5.length-1].push(c);
                    })
                }
            })
            
        }
        console.log(m5);
        // Utils.printTable15(m5,50,50);
        
        // let path2 = null;
        let path2 = aStar(m5,[0,0],[m5[m5.length-1].length-1,m5.length-1]);
        
        let sum2 = path2 === null ? -1:path2.fullCost;
        setAns2(sum2);
    }
    function step (x,y,parent,cost) {
        this.x = x;
        this.y = y;
        this.parent = parent;
        this.cost = cost;
        this.fullCost = (parent === null ? 0:parent.fullCost) + cost;
        this.getFullCost = function() {
            return this.cost + ((this.parent === null) ? 0 : this.parent.getFullCost());
        }
        this.printPath = function() {
            console.log(this.x,this.y,this.cost);
            if(this.parent !== null)
                this.parent.printPath();
        }
    }
    function aStar(m, start, target) {
        console.log(start,target);
        let open = [new step(0,0,null,0)];
        let closed = [[],[],[],[],[],[],[],[],[],[]];
        
        
        let steps = 0;
        while(steps < 500000 && open.length > 0) {
            let cheapest = getCheapest(open);
            // console.log(steps,cheapest, open[cheapest]);
            let item = open[cheapest];
            let neighbours = Utils.getNeighbours2d(item.x,item.y, m[item.y].length-1, m.length-1);
            // console.log("neighbours",neighbours);
            
            neighbours.forEach((n)=>{
                let cost = m[n[1]][n[0]];
                if(!closed[cost].some((element)=>{return element.x === n[0] && element.y === n[1]})) {
                    if(!closed.some((element)=>{return element.x === n[0] && element.y === n[1]})) {
                        if(!open.some((element)=>{return element.x === n[0] && element.y === n[1]})) {
                            open.push(new step(n[0],n[1],item, cost));
                            // console.log("adding to open", open[open.length-1]);
                        }
                    }
                }
                
            });
            closed[item.cost].push(item);
            open.splice(cheapest,1);
            // console.log([...open],[...closed]);
            if(item.x === target[0] && item.y === target[1]) {
                // return rev(m, item);
                return item;
            }
            steps++;
            if(steps%1000===0)
                console.log(steps, open.length, 
                    closed[1].length, closed[2].length, closed[3].length, closed[4].length, closed[5].length, closed[6].length
                    , closed[7].length, closed[8].length, closed[9].length);
        }
        
        return null;
    }
    function getCheapest(arr) {
        let cheapest = 10000;
        let i = -1;
        for(let item in  arr) {
            if(arr[item].fullCost < cheapest) {
                cheapest = arr[item].fullCost;
                i = item;
            }
        }
        return i;
    }
    
    
    
    
    return (
        <div>
            <div>{answer1}</div>
            <div>{answer2}</div>
        </div>
    )
}

