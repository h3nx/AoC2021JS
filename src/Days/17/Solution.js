import rawData from "./input.txt"
import {useState, useEffect} from "react"
import * as Utils from "./../Utils";




export function Solution17() {
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
          
        let spl = data[0].split(" ");
        let xx = Utils.stringToIntegerArr(spl[2].substring(2).split(".."));
        let yy = Utils.stringToIntegerArr(spl[3].substring(2).split(".."));
        console.log(spl);
        console.log(xx,yy);
        console.log();
        
        let angle = [1,1];
        let possibleX = [];
        let possibleY = [];
        let possible = [];
        /// calc x
        
        for(let vel = 1; vel < 30; vel++) {
            let xpos = 0;
            let xvel = vel;
            for(let steps = 0; steps < 10000; steps++) {
                xpos += xvel;
                xvel--;
                if(xvel === 0) {
                    if(xpos > xx[0] && xpos < xx[1]) {
                        possibleX.push([vel, steps]);
                        console.log(xvel,xpos, steps);
                    }
                    break;
                    
                }
            }
            
        }
        console.log(possibleX);
        
        let highestTotalY = 0;
        for(let xInd in possibleX) {
            
            let pos = [0,0];
            for(let yVel = -100; yVel < 110; yVel++) {
                let highestY = 0;
                let ypos = 0;
                let vel = yVel;
                for(let steps = 0; steps < 10000; steps++) {
                    ypos += vel;
                    vel -= 1;
                    if(highestY<ypos)
                        highestY = ypos;
                    
                    if(ypos >= yy[0] && ypos <= yy[1] && steps >= possibleX[xInd][1]) {
                        if(highestTotalY < highestY) {
                            highestTotalY = highestY;
                        }
                        possibleY.push([yVel,highestY]);
                        // console.log("xvel", possibleX[xInd][0], "yvel", yVel, "ypos", ypos, "highest",highestY);
                        break;
                    }
                    if(ypos < yy[0] || ypos < yy[1]) {
                        // console.log("breaking", possibleX[xInd][1], yVel, ypos, steps);
                        break;
                    }
                }
                
            }
        }
        
        
        for(let xVel = 1; xVel < 1200; xVel++) {
            for(let yVel = -1500; yVel < 1500; yVel++) {
                let pos = [0,0];
                let vel = [xVel, yVel];
                for(let steps = 0; steps < 18000; steps++) {
                    pos[0] += vel[0];
                    pos[1] += vel[1];
                    if(vel[0] > 0)
                        vel[0] -= 1;
                    vel[1] -= 1;
                    
                    if(pos[1] >= yy[0] && pos[1] <= yy[1] && pos[0] >= xx[0] && pos[0] <= xx[1]) {
                        possible.push([xVel,yVel]);
                        break;
                    }
                    if(pos[1] < yy[0] || pos[0] > xx[1])
                        break;
                }
                
            }
        }
        
        // console.log(possibleX);
        console.log(possible);
        
        let sum1 = highestTotalY;
        setAns1(sum1);
        
        let sum2 = possible.length;
        setAns2(sum2);
    }
    
    
    
    
    
    
    
    
    
    
    return (
        <div>
            <div>{answer1}</div>
            <div>{answer2}</div>
        </div>
    )
}

