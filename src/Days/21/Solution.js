import rawData from "./input.txt"
import {useState, useEffect} from "react"
import * as Utils from "./../Utils";




export function Solution21() {
    // eslint-disable-next-line
    const [answer1, setAns1] = useState(-1);
    // eslint-disable-next-line
    const [answer2, setAns2] = useState(-1);
    
    useEffect(()=> {
        console.time("total");
        fetch(rawData)
        .then(r => r.text())
        .then(text => {
            solve(Utils.SplitByNewLine(text));
            console.timeEnd("total");
        });
        
    },[]);
    
    
    
    
    
    function solve(data) {
        console.log(data);
          
        let scores = [0,0];
        let place = [
            parseInt(data[0].split(" ")[4])-1,
            parseInt(data[1].split(" ")[4])-1
        ]
        var rollData = [];
        for(let r1 = 1; r1 <= 3; r1++) {
            for(let r2 = 1; r2 <= 3; r2++) {
                for(let r3 = 1; r3 <= 3; r3++) {
                    rollData.push(r1+r2+r3);
                }
            }
        }
        rollData.sort((a,b)=>a-b);
        console.log(rollData);

        let cache = [];
        for(let i = 0; i < 10; i++) {
            cache.push([]);
            for(let c = 3; c < 10; c++) {
                cache[i][c] = (i+c)%10;
            }
        }
        console.log(cache);
        
        
        let roll = 0;
        let turn = 0;
        for(let i = 0; i < 1000; i++) {
            let s = 0
            for(let rolls = 0; rolls < 3; rolls++) {
                roll++;
                s += roll;
            }
            place[turn] = (place[turn]+s)%10;
            scores[turn] += place[turn]+1;
            // console.log(i,"rolls",roll,"lands on",place[turn]+1,"has score",scores[turn]);
            // console.log(i, turn, place, scores);
            if(scores[turn] >= 1000) {
                turn = (turn+1)%2;
                break;
            }
            turn = (turn+1)%2;
        }
        console.log("winner",turn,scores[turn],roll);

        let sum1 = roll*scores[turn];
        setAns1(sum1);
        
        
        
        
        function wins(turn, scores, places) {
            
            let totalWins = [0,0];
            let prevRoll = 0;
            let prevWins = [0,0];
            for(let rollIndex in rollData) {
                if(rollData[rollIndex] === prevRoll) {
                    totalWins[0] += prevWins[0];
                    totalWins[1] += prevWins[1];
                    continue;
                }
                
                let p = [places[0],places[1]];
                let s = [scores[0],scores[1]];
                p[turn] = cache[p[turn]][rollData[rollIndex]];
                s[turn] += p[turn]+1;
                if(s[turn] >= 21) {
                    totalWins[turn]++;
                    prevWins[0]=0;
                    prevWins[1]=0;
                    prevWins[turn]++;
                } else {
                    prevWins = wins((turn+1)%2,s,p);
                    totalWins[0] += prevWins[0];
                    totalWins[1] += prevWins[1];
                }
                prevRoll = rollData[rollIndex];
            }
            return totalWins;
        }
        let winners = wins(0,[0,0],[ parseInt(data[0].split(" ")[4])-1, parseInt(data[1].split(" ")[4])-1 ]);
        // let winners = [0,0];
        console.log("winners",winners);
        
        
        
        
        
        let sum2 = winners[0] > winners[1] ? winners[0] : winners[1];
        setAns2(sum2);
    }
    
    
    return (
        <div>
            <div>{answer1}</div>
            <div>{answer2}</div>
        </div>
    )
}





//let winners = [0,0]
        //let universeCount = universes.length;
        // for(let i = 0; i < 10; i++) {
        //     console.log(i);
        //     let turn = 0;
        //     let other = 0;
        //     for(let u = 0; u < universeCount; u++) {
        //         let universe = universes[u];
        //         if(universe.scores[0] >= 21 || universe.scores[1] >= 21 )
        //             continue;
                
        //         turn = universe.turn;
        //         other = (turn+1) % 2;
                
        //         let p = 0;
        //         let s = 0;
                
                
                
        //         for(var c = 1; c < 27; c++) {
        //             p = (universe.places[turn]+rollData[c])%10;
        //             s = universe.scores[turn]+p+1;
        //             if(s >= 21) {
        //                 winners[turn]++;
        //             } else {
        //                 let newUni = new Universe(other,[0,0],[0,0]);
        //                 newUni.scores[turn] = s;
        //                 newUni.scores[other] = universe.scores[other];
        //                 newUni.places[turn] = p;
        //                 newUni.places[other] = universe.places[other];
        //                 universes.push(newUni);
        //             }
        //         }
                
                
        //         universe.places[turn] = (universe.places[turn]+rollData[0])%10;
        //         universe.scores[turn] = universe.scores[turn]+p+1;
        //         if(universe.scores[turn] >= 21)
        //             winners[turn]++;
        //         universe.turn = other;
                
        //     }
        //     console.log("\t", universeCount, "-->", universes.length, "|| ", winners[0], ":", winners[1]);
        //     if(universeCount === universes.length)
        //         break;
        //     // console.log(universeCount, " * 27 =", universes.length);
        //     universeCount = universes.length;
        // }
