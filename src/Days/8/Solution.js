import rawData from "./input.txt"
import {useState, useEffect} from "react"
import * as Utils from "./../Utils";




export function Solution8() {
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
        
        let s = data.map((str)=>{return str.split(" | ")});
        // console.log(s);
        let parts = s.map((arr)=> {
            return [arr[0].split(" "), arr[1].split(" ")];
        });
        // console.log(parts);
            
        
        
        
        
        let count = 0; 
        parts.forEach((line)=> {
            line[1].forEach((nr)=> {
                if(nr.length === 2) {
                    count++;
                }
                if(nr.length === 3) {
                    count++;
                }
                if(nr.length === 4) {
                    count++;
                }
                if(nr.length === 7) {
                    count++;
                }
            })
            
        }) ;
        setAns1(count);
        count = 0;
        let word = 0;
        let words = [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ];
        // 2, 4, 3, 7
        parts.forEach((line)=> {
            let l = 1000;
            
            let others5 = [];
            let others6 = [];
            line[0].forEach((nr)=> {
                if(nr.length === 2) words[1] = nr;
                else if(nr.length === 3) words[7] = nr;
                else if(nr.length === 4) words[4] = nr;
                else if(nr.length === 7) words[8] = nr;
                else if(nr.length === 5)others5.push(nr);
                else if(nr.length === 6)others6.push(nr);
            })
            
            // console.log(" ");
            // console.log(" ");
            // console.log([...words], [...others5],[...others6]);
            
            let spl = -1;
            // 5: 2 3 5 
            others5.forEach((w,index) => {
                
                if(Utils.matchChars(w, words[1])) {
                    words[3] = w;
                    spl = index;
                    // console.log(3, w, words);
                }
                
            });
            if(spl > -1)
                others5.splice(spl,1);
            // console.log(5,[...others5], words);
            
            
            spl = -1;
            // 6: 0 5 9
            others6.forEach((w,index) => {
                
                if(Utils.matchChars(w, words[4]) && Utils.matchChars(w, words[7])) {
                    words[9] = w;
                    spl = index;
                    // console.log(3, w, words);
                }
            });
            if(spl > -1)
                others6.splice(spl,1);
            // console.log(6,[...others6], words);
            
            spl = -1;
            // 6: 0 5
            others6.forEach((w,index) => {
                
                if(Utils.matchChars(w, words[7])) {
                    words[0] = w;
                    spl = index;
                    // console.log(3, w, words);
                }
            });
            if(spl > -1)
                others6.splice(spl,1);
            // console.log(6,[...others6], words);
            words[6] = others6[0];
            
            spl = -1;
            // 5: 2 3 5 
            others5.forEach((w,index) => {
                
                if(Utils.matchChars(words[6], w)) {
                    words[5] = w;
                    spl = index;
                    // console.log(3, w, words);
                }
                
            });
            if(spl > -1)
                others5.splice(spl,1);
            // console.log(5,[...others5], words);
            
            words[2] = others5[0];
            
            
            
            
            
            // console.log(words, line[1]);
            word = 0;
            line[1].forEach((nr)=> {
                for(let i = 0; i < words.length; i++) {
                    // console.log(i, words[i], nr);
                    if(Utils.matchChars2(words[i], nr)) {
                        word += l*i;
                        // console.log(word, l, i);
                        l/=10;
                        break;
                    }                
                }
            })
            // console.log(count, word);
            count += word;
        }) ;
        setAns2(count);
    // 2, 4, 3, 7
    
    /*
        cfbegad
        acedgfb
    
    
    */
   
        
    }
    
    
    
    return (
        <div>
            <div>{answer1}</div>
            <div>{answer2}</div>
        </div>
    )
}

