import rawData from "./input.txt"
import {useState, useEffect} from "react"
import * as Utils from "./../Utils";




export function Solution19() {
    // eslint-disable-next-line
    const [answer1, setAns1] = useState(-1);
    // eslint-disable-next-line
    const [answer2, setAns2] = useState(-1);
    
    useEffect(()=> {
        console.time("total");
        fetch(rawData)
        .then(r => r.text())
        .then(text => {
            solve(Utils.splitByNewEmptyLine(text));
            console.timeEnd("total");
        });
        
    },[]);
    
    function solve(data) {
        console.log(data);
        
        
        let scanners = data.map((line)=> {
            return Utils.SplitByNewLine(line).slice(1).map((str)=>{return Utils.stringToIntegerArr(str.split(","))});
        });
        
        console.log(scanners);
        
        
        // scanners.forEach((probe,pIndex)=> {
        //     probe.forEach((location)=>{
        //         console.log(pIndex, location[0],location[1],location[2]);
        //     })
        // })
        
        // scanners[0].forEach((location,index)=> {
        //     console.log(
        //         scanners[1][0][0],scanners[1][0][1],scanners[1][0][2], " - ",
        //         scanners[0][index][0],scanners[0][index][1],scanners[0][index][2], " = ",
                
                
        //         scanners[1][0][0]- scanners[0][index][0],
        //         scanners[1][0][1]- scanners[0][index][1],
        //         scanners[1][0][2]- scanners[0][index][2]
        //     )
        // })
        
        
        
        
        let scannerPos = [[0,0,0]];
        let absolutePositions = [...scanners[0]];
        
        scanners = scanners.slice(1);
        while(scanners.length > 0) {
            // console.log("map", absolutePositions);
            // console.log("scanners",scanners);
            let toRemove = [];
            for(let i = 0; i < scanners.length; i++) {
                // console.log(i,"___________________________");
                let positions = match(absolutePositions,scanners[i]);
                // console.log("positions",positions);
                if(positions != null) {
                    // console.log(i,"CONCATING", positions);
                    scannerPos.push(positions[0]);
                    
                    absolutePositions = absolutePositions.concat(positions.slice(1));
                    toRemove.push(i);
                    // console.log("POSITIONS",absolutePositions);
                }
            }
            for(let i = toRemove.length-1; i >=0 ; i--) {
                scanners.splice(toRemove[i],1);
                // console.log("removing ", toRemove[i]);
            }
            if(toRemove.length === 0) {
                // console.log("nothing to remove");
                break;
            }
        }
        absolutePositions.sort((a,b)=>{return (a[0]-b[0])/*+10000*(a[1]-b[1])+1*(a[2]-b[2])*/});
        console.log(scannerPos);
        
        
        
        
        
        
        
        //434
        let sum1 = absolutePositions.length;
        setAns1(sum1);
        //11906
        let sum2 = getLongest(scannerPos);;
        setAns2(sum2);
    }
    
    function getLongest(scanners) {
        
        let longest = 0;
        scanners.forEach((scanner1)=> {
            scanners.forEach((scanner2)=> {
                let l = Math.abs(scanner1[0]-scanner2[0])+     Math.abs(scanner1[1]-scanner2[1])       +Math.abs(scanner1[2]-scanner2[2]);
                if(l > longest)
                longest = l;
            })
        })
        return longest;
        
        
        
    }
    function matchDirection(scannerAbs,scannerRel,x,y,z, rotation) {
        let diff = [];
        for(let i = 0; i < scannerAbs.length; i++) {
            for(let k = 0; k < scannerRel.length; k++) {
                if(rotation === 0) {
                    diff.push([
                        scannerRel[k][0]*x+scannerAbs[i][0],
                        scannerRel[k][1]*y+scannerAbs[i][1],
                        scannerRel[k][2]*z+scannerAbs[i][2],
                        i,
                        k
                    ]);  
                }     
                if(rotation === 1) {
                    diff.push([
                        scannerRel[k][1]*x+scannerAbs[i][0],
                        scannerRel[k][2]*y+scannerAbs[i][1],
                        scannerRel[k][0]*z+scannerAbs[i][2],
                        i,
                        k
                    ]);  
                }     
                if(rotation === 2) {
                    diff.push([
                        scannerRel[k][2]*x+scannerAbs[i][0],
                        scannerRel[k][0]*y+scannerAbs[i][1],
                        scannerRel[k][1]*z+scannerAbs[i][2],
                        i,
                        k
                    ]);  
                }     
                if(rotation === 3) {
                    diff.push([
                        scannerRel[k][1]*x+scannerAbs[i][0],
                        scannerRel[k][0]*y+scannerAbs[i][1],
                        scannerRel[k][2]*z+scannerAbs[i][2],
                        i,
                        k
                    ]);  
                }     
                if(rotation === 4) {
                    diff.push([
                        scannerRel[k][2]*x+scannerAbs[i][0],
                        scannerRel[k][1]*y+scannerAbs[i][1],
                        scannerRel[k][0]*z+scannerAbs[i][2],
                        i,
                        k
                    ]);  
                }     
                if(rotation === 5) {
                    diff.push([
                        scannerRel[k][0]*x+scannerAbs[i][0],
                        scannerRel[k][2]*y+scannerAbs[i][1],
                        scannerRel[k][1]*z+scannerAbs[i][2],
                        i,
                        k
                    ]);  
                }     
            }
        }
        if(diff.length !== scannerRel.length*scannerAbs.length) {
            // console.log("no matching length");
            
        }
        diff.sort((a,b)=>{return (a[0]-b[0])/*+10000*(a[1]-b[1])+1*(a[2]-b[2])*/});
        
        let prev = diff[0];
        let count = 0;
        let maxCount = 0;
        let val = [];
        diff.forEach((pos)=> {
            if(pos[0] === prev[0] && pos[1] === prev[1] && pos[2] === prev[2]) {
                count++;
            }
            else {
                if(count > maxCount) {
                    maxCount = count;
                    val = prev;
                }
                count = 0;
            }
            prev = pos;
        });
        let filt = diff.filter((line)=>{return line[0] === val[0] && line[1] === val[1] && line[2] === val[2]});
        
        
        if(filt.length > 10) {
            // console.log("matching",val, maxCount);
            // console.log(filt);
            let scanPos = [filt[0][0],filt[0][1],filt[0][2]];
            
            // console.log("found pos ",scanPos);
            let list = [];
            for(let k = 0; k < scannerRel.length; k++) {
                if(rotation === 0) {
                    list.push([
                        scanPos[0]-scannerRel[k][0]*x,
                        scanPos[1]-scannerRel[k][1]*y,
                        scanPos[2]-scannerRel[k][2]*z
                    ]);  
                }     
                if(rotation === 1) {
                    list.push([
                        scanPos[0]-scannerRel[k][1]*x,
                        scanPos[1]-scannerRel[k][2]*y,
                        scanPos[2]-scannerRel[k][0]*z
                    ]);  
                }     
                if(rotation === 2) {
                    list.push([
                        scanPos[0]-scannerRel[k][2]*x,
                        scanPos[1]-scannerRel[k][0]*y,
                        scanPos[2]-scannerRel[k][1]*z
                    ]);  
                }     
                if(rotation === 3) {
                    list.push([
                        scanPos[0]-scannerRel[k][1]*x,
                        scanPos[1]-scannerRel[k][0]*y,
                        scanPos[2]-scannerRel[k][2]*z
                    ]);  
                }     
                if(rotation === 4) {
                    list.push([
                        scanPos[0]-scannerRel[k][2]*x,
                        scanPos[1]-scannerRel[k][1]*y,
                        scanPos[2]-scannerRel[k][0]*z
                    ]);  
                }     
                if(rotation === 5) {
                    list.push([
                        scanPos[0]-scannerRel[k][0]*x,
                        scanPos[1]-scannerRel[k][2]*y,
                        scanPos[2]-scannerRel[k][1]*z
                    ]);  
                }     
            }
            
            
            // console.log(list);
            
            let copies = list.filter((pos)=>{return scannerAbs.some((absPos)=>{return absPos[0] === pos[0] && absPos[1] === pos[1] && absPos[2] === pos[2] })});
            // console.log("abs,list,copies");
            // console.log(scannerAbs,list, copies);
            let toAdd = list.filter((pos)=>{return !scannerAbs.some((absPos)=>{return (absPos[0] === pos[0] && absPos[1] === pos[1] && absPos[2] === pos[2]) })});
            // console.log(copies);
            // console.log("TOADD",toAdd);
            // console.log(toAdd,[filt[0][0],filt[0][1],filt[0][2]]);
            // console.log()
            toAdd.unshift([filt[0][0],filt[0][1],filt[0][2]])
            return toAdd;
        }
        if(filt.length < 11) {
            return null;
        }
    }
    
    function match(scannerAbs,scannerRel) {
        // scannerAbspos == scannerRelpos - beaconPos
        // - scannerAbspos + scannerRelpos = beaconPos
        // console.time("match");
        let directions = [];
        for(let x = -1; x <= 1; x+=2) {
            for(let y = -1; y <= 1; y+=2) {
                for(let z = -1; z <= 1; z+=2) {
                    directions.push([x,y,z]);
                }
            }
        }
        // console.log(directions);
        for(let i = 0; i < directions.length; i++) {
            for(let rotation = 0; rotation < 6; rotation++) {
                let res = matchDirection(scannerAbs,scannerRel, directions[i][0],directions[i][1],directions[i][2], rotation);
                if(res !== null) {
                    // console.timeEnd("match");
                    return res;
                }
                
            }
        }
        
        
        
        
        
        // console.time("match");
        return null;
    }
    
    
    return (
        <div>
            <div>{answer1}</div>
            <div>{answer2}</div>
        </div>
    )
}

