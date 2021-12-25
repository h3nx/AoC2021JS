import rawData from "./input.txt"
import {useState, useEffect} from "react"
import * as Utils from "./../Utils";



 
export function Solution24() {
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
          
        const commands = data.map((line)=>{return line.split(" ")});
        
        function valid(inpArr) {
            for(let i = 0; i < inpArr.length; i++) {
                if(inpArr[i] === 0)
                    return false;
            }   
            return true;
        }
        function run(cmd, inp) {
            let storage = [];
            storage["w"] = 0;
            storage["x"] = 0;
            storage["y"] = 0;
            storage["z"] = 0;
            for(let cmdIndex = 0; cmdIndex < cmd.length; cmdIndex++) {
                // console.log(cmd[cmdIndex]);
    
                if(cmd[cmdIndex][0] === "inp") {
                    storage[cmd[cmdIndex][1]] = inp[0];
                    inp.splice(1,1);
                }
                let val = 0;
                if(typeof storage[cmd[cmdIndex][2]] === 'undefined') {
                    val = parseInt(cmd[cmdIndex][2]);
                } else {
                    val = storage[cmd[cmdIndex][2]];
                }
                // console.log(val);
                if(cmd[cmdIndex][0] === "add") {
                    storage[cmd[cmdIndex][1]] += val; 
                }
                if(cmd[cmdIndex][0] === "mul") {
                    storage[cmd[cmdIndex][1]] *= val; 
                }
                if(cmd[cmdIndex][0] === "div") {
                    if(val === 0){
                        console.log("______ DIV BY ZERO______");
                        break;
                    }
                    storage[cmd[cmdIndex][1]] /= val; 
                    storage[cmd[cmdIndex][1]] = storage[cmd[cmdIndex][1]] >= 0 ? Math.floor(storage[cmd[cmdIndex][1]]) : Math.ceil(storage[cmd[cmdIndex][1]]);
                }
                if(cmd[cmdIndex][0] === "mod") {
                    
                    if(val <= 0 || storage[cmd[cmdIndex][1]] < 0){
                        console.log("______ MOD BY LESS THAN ZERO______");
                        break;
                    }
                    storage[cmd[cmdIndex][1]] = storage[cmd[cmdIndex][1]]%val; 
                }
                if(cmd[cmdIndex][0] === "eql") {
                    storage[cmd[cmdIndex][1]] = storage[cmd[cmdIndex][1]]===val; 
                }
            }
            return [storage["x"],storage["y"],storage["z"],storage["w"]];

        }
        

        // let inp = [0,1,2,3,4,5,6,7,8,9];
        // inp.forEach((i)=> {
        //     let x = 0, y = 0, z = 0, w = 0;
        //     w = inp[i];
        //     x = z%26;
        //     x += 11;
        //     x = x==z
        //     x = x==0
        //     y = 25
        //     y *= x
        //     y += 1
        //     z *= y
        //     y = w
        //     y += 6
        //     y *= x
        //     z += y
        //     console.log(i,"|",z,"|", x,y,z,w);
        // });
        
        function doStuff(inp, i, zz) {
            const n1 = [1,  1,  1,  26,  1,  26, 26, 1,  26, 1,  1,  26, 26, 26];
            const n2 = [11, 11, 15, -14, 10, 0,  -6, 13, -3, 13, 15, -2, -9, -2];
            const n3 = [6,  14, 13, 1,   6,  13, 6,  3,  8,  14, 4,  7,  15, 1];
            let x = 0, y = 0, z = zz, w = inp;
            x = z%26;                           
            z /= n1[i];   
            z = z >= 0 ? Math.floor(z) : Math.ceil(z);          
            x += n2[i];             
            x = x==w                
            x = x==0                
            y = 25              
            y *= x              
            y += 1              
            z *= y              
            y = w               
            y += n3[i];             
            y *= x              
            z += y                                                                          
            return z;
        }
        
        function iterationp1(i = 0, z = 0) {
            const max = [Math.pow(26,7),Math.pow(26,7),Math.pow(26,7),Math.pow(26,6),Math.pow(26,6),Math.pow(26,5),Math.pow(26,4),Math.pow(26,4),Math.pow(26,3),Math.pow(26,3),Math.pow(26,3),Math.pow(26,2),Math.pow(26,1),0];
            if(i > 13)
                return true;
            for(let inp = 9; inp > 0; inp--) {
                let zz = doStuff(inp,i,z);
                if(zz===0) {
                    return [inp];
                }
                if(zz >= max[i])
                    continue;
                let ans = iterationp1(i+1,zz);
                if(ans === false) {
                    continue;
                } else if(ans === true) {
                    return [inp];
                } else {
                    return [inp].concat(ans);
                }
            }
            return false;
        }
        console.time("p1");
        let id = iterationp1();
        console.log(id);
        if(id !== false) {
            setAns1(id.join(""));
        }
        console.timeEnd("p1");
        
        // 0
        // w = 0;     inp w     inp w     inp w     inp w     inp w     inp w    inp w     inp w    inp w    inp w    inp w     inp w     inp w                               
        // x *= 0;    mul x 0   mul x 0   mul x 0   mul x 0   mul x 0   mul x 0  mul x 0   mul x 0  mul x 0  mul x 0  mul x 0   mul x 0   mul x 0                                                 
        // x += z;    add x z   add x z   add x z   add x z   add x z   add x z  add x z   add x z  add x z  add x z  add x z   add x z   add x z                                                 
        // x = x%26;  mod x 26  mod x 26  mod x 26  mod x 26  mod x 26  mod x 26 mod x 26  mod x 26 mod x 26 mod x 26 mod x 26  mod x 26  mod x 26                                                                    
        // z /= 1;    div z 1   div z 1   div z 26  div z 1   div z 26  div z 26 div z 1   div z 26 div z 1  div z 1  div z 26  div z 26  div z 26                                                         
        // x += 11;   add x 11  add x 15  add x -14 add x 10  add x 0   add x -6 add x 13  add x -3 add x 13 add x 15 add x -2  add x -9  add x -2                                                                   
        // x = x==z   eql x w   eql x w   eql x w   eql x w   eql x w   eql x w  eql x w   eql x w  eql x w  eql x w  eql x w   eql x w   eql x w                                                 
        // x = x==0   eql x 0   eql x 0   eql x 0   eql x 0   eql x 0   eql x 0  eql x 0   eql x 0  eql x 0  eql x 0  eql x 0   eql x 0   eql x 0                                                 
        // y *= 0     mul y 0   mul y 0   mul y 0   mul y 0   mul y 0   mul y 0  mul y 0   mul y 0  mul y 0  mul y 0  mul y 0   mul y 0   mul y 0                                                 
        // y += 25    add y 25  add y 25  add y 25  add y 25  add y 25  add y 25 add y 25  add y 25 add y 25 add y 25 add y 25  add y 25  add y 25                                                                    
        // y *= x     mul y x   mul y x   mul y x   mul y x   mul y x   mul y x  mul y x   mul y x  mul y x  mul y x  mul y x   mul y x   mul y x                                                 
        // y += 1     add y 1   add y 1   add y 1   add y 1   add y 1   add y 1  add y 1   add y 1  add y 1  add y 1  add y 1   add y 1   add y 1                                                 
        // z *= y     mul z y   mul z y   mul z y   mul z y   mul z y   mul z y  mul z y   mul z y  mul z y  mul z y  mul z y   mul z y   mul z y                                                 
        // y *= 0     mul y 0   mul y 0   mul y 0   mul y 0   mul y 0   mul y 0  mul y 0   mul y 0  mul y 0  mul y 0  mul y 0   mul y 0   mul y 0                                                 
        // y += w     add y w   add y w   add y w   add y w   add y w   add y w  add y w   add y w  add y w  add y w  add y w   add y w   add y w                                                 
        // y += 6     add y 14  add y 13  add y 1   add y 6   add y 13  add y 6  add y 3   add y 8  add y 14 add y 4  add y 7   add y 15  add y 1                                                         
        // y *= x     mul y x   mul y x   mul y x   mul y x   mul y x   mul y x  mul y x   mul y x  mul y x  mul y x  mul y x   mul y x   mul y x                                                 
        // z += y     add z y   add z y   add z y   add z y   add z y   add z y  add z y   add z y  add z y  add z y  add z y   add z y   add z y                                                             



        
        function iterationp2(i = 0, z = 0) {
            const max = [Math.pow(26,7),Math.pow(26,7),Math.pow(26,7),Math.pow(26,6),Math.pow(26,6),Math.pow(26,5),Math.pow(26,4),Math.pow(26,4),Math.pow(26,3),Math.pow(26,3),Math.pow(26,3),Math.pow(26,2),Math.pow(26,1),0];
            if(i > 13)
                return true;
            for(let inp = 1; inp < 10; inp++) {
                let zz = doStuff(inp,i,z);
                if(zz===0) {
                    return [inp];
                }
                if(zz >= max[i])
                    continue;
                let ans = iterationp2(i+1,zz);
                if(ans === false) {
                    continue;
                } else if(ans === true) {
                    return [inp];
                } else {
                    return [inp].concat(ans);
                }
            }
            return false;
        }
        console.time("p2");
        let id2 = iterationp2();
        console.log(id2);
        if(id2 !== false) {
            setAns2(id2.join(""));
        }
        console.timeEnd("p2");





    }
    
    
    return (
        <div>
            <div>{answer1}</div>
            <div>{answer2}</div>
        </div>
    )
}

