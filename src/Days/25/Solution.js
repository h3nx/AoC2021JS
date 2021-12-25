import rawData from "./input.txt"
import {useState, useEffect} from "react"
import * as Utils from "./../Utils";




export function Solution25() {
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
        console.time("p1");
        
        let map = data.map((line)=>{return line.split("")});
        console.log(map);
        // Utils.printTable25(map,map[0].length,map.length);
        for(let steps = 1; steps < 1000; steps++) {
            let moves = 0;
            let move = [];
            for(let y = 0; y < map.length; y++) {
                for(let x = 0; x < map[y].length; x++) {
                    if(map[y][x] === ">" && map[y][(x+1)%(map[y].length)]=== "."){
                        // console.log(steps, x,y,"->",x+1,y);
                        move.push([x,y]);
                        moves++;
                    }
                }
            }

            move.forEach((m)=> {
                map[m[1]][m[0]] = ".";
                map[m[1]][(m[0]+1)%(map[m[1]].length)] = ">";
            });

            move = [];
            for(let x = 0; x < map[0].length; x++) {
                for(let y = 0; y < map.length; y++) {
                    if(map[y][x] === "v" && map[(y+1)%(map.length)][x] === "."){
                        move.push([x,y]);
                        moves++;
                    }
                }
            }

            move.forEach((m)=> {
                map[m[1]][m[0]] = ".";
                map[(m[1]+1)%(map.length)][m[0]] = "v";
            });

            // console.log("steps", steps);
            // Utils.printTable25(map,map[0].length,map.length);




            if(moves === 0) {
                console.log("NO MORE MOVES",steps);
                setAns1(steps);
                break;
            }
        }


        console.timeEnd("p1");
        

    }
    
    
    return (
        <div>
            <div>{answer1}</div>
            <div>{[...Array(49)].map((s)=>{return("*")})}</div>
        </div>
    )
}

