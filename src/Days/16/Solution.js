import rawData from "./input.txt"
import {useState, useEffect} from "react"
import * as Utils from "./../Utils";




export function Solution16() {
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
          
        const message = data[0].split("");
        
        console.log(message);
        let bin = message.map((char)=>{return Utils.hex2bin(char)});
        console.log(bin);
        
        let total = bin.join("");
        console.log(total);
        
        
        
        let shell = createMessage(total);
        parseMessage(shell);    
        console.log("SHELL",shell);    
        
        let sum1 = sumVersion(shell);
        setAns1(sum1);
        
        let sum2 = calculate(shell);
        setAns2(sum2);
    }
    
    function sumVersion(message) {
        let childrenSum = 0;
        for(let ind in message.messages)
            childrenSum += sumVersion(message.messages[ind]);
        return message.version + childrenSum;
    }
    function calculate(message) {
        let value = 0;
        if(message.id === 0) {
            //add
            message.messages.forEach((m)=>{value += calculate(m)});
        } 
        if(message.id === 1) {
            //multi
            value = calculate(message.messages[0]);
            for(let i = 1; i < message.messages.length; i++) {
                value *= calculate(message.messages[i]);
            }
        } 
        if(message.id === 2) {
            //min
            value = 10000;
            message.messages.forEach((m)=>{value = Math.min(value,calculate(m))});
        } 
        if(message.id === 3) {
            //max
            value = 0;
            message.messages.forEach((m)=>{value = Math.max(value,calculate(m))});
        } 
        
        if(message.id === 4) {
            //literal
            value = message.literal;
        } 
        if(message.id === 5) {
            //greater than
            if(calculate(message.messages[0]) > calculate(message.messages[1]))
                return 1;
            else
                return 0;
        } 
        if(message.id === 6) {
            //less than
            if(calculate(message.messages[0]) < calculate(message.messages[1]))
                return 1;
            else
                return 0;
        } 
        if(message.id === 7) {
            //equals
            if(calculate(message.messages[0]) === calculate(message.messages[1]))
                return 1;
            else
                return 0;
        } 
        return value
    }
    
    function Message(version, id, rest) {
        this.version = version;
        this.id = id;
        this.rest = rest;
        this.messages = [];
        this.literal = 0;
        this.parsed = false;
    }
    
    
    function parseMessage(message) {
        console.log("PARSING MESSAGE", message);
        let rest = "";
        if(message.id === 4) {
            // console.log("Literal Message", message);
            rest = parseLiteral(message);
        }else {
            // console.log("Operator Message", message);
            rest = parseOperator(message);
        }
        return rest;
    }
    function createMessage(string) {
        let orig =  new Message(parseInt(string.substring(0,3),2),parseInt(string.substring(3,6),2),string.substring(6));
        // console.log("new message",orig);
        return orig;
    }
    function parseOperator(message) {
        // console.log("- operator",message.rest);
        if(message.rest === "")
            return "";

        let restOfMessage = "";
        let l = message.rest.substring(0,1);
        let m = message.rest.substring(1);
        
        // console.log("-", l === "0" ? "bits" :"packets", m);
        if(l === "0") {
            // bits
            let nrBits = m.substring(0,15);
            let bits = parseInt(nrBits,2);
            let subm = m.substring(15,15+bits);
            m = m.substring(15+bits);
            // console.log("-", bits, "bits", m);
            let iterations = 0;
            while(bits > 0 && iterations < 5) {
                // console.log(iterations, bits);
                let temp = createMessage(subm);
                message.messages.push(temp);
                let notUsed = parseMessage(message.messages[message.messages.length-1]);
                // console.log("REST?",notUsed);
                let count = subm.length-notUsed.length;
                // console.log("bits used", count);
                bits -= count;
                
                subm = notUsed;
                iterations++;
            }
            
        } else {
            // packets
            let nrBits = m.substring(0,11);
            let packets = parseInt(nrBits,2);
            m = m.substring(11);
            // console.log("-", packets, "packets", nrBits, m);
            
            for(let i =0; i < packets; i++) {
                let temp = createMessage(m);
                message.messages.push(temp);
                m = parseMessage(temp);
                
                // console.log(temp);
            }
            
            
        }
        
        
        return m;
            
    }
    function parseLiteral(message) {
        // console.log("- literal", message.rest);
        let m = message.rest;
        // console.log(m.length,m);
        let nrBin = "";
        let print = "";
        while(m.length > 4) {
            print += m.substring(0,1) + " " + m.substring(1,5)+ ",  ";
            nrBin += m.substring(1,5);
            // console.log(nrBin);
            if(m[0] === "0") {
                m = m.substring(5);
                break;
            }             
            m = m.substring(5);
        }
        message.literal = parseInt(nrBin,2);
        // console.log("RESULT LITERAL", message.literal, print);
        return m;
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    return (
        <div>
            <div>{answer1}</div>
            <div>{answer2}</div>
        </div>
    )
}




 
        // console.log("version",pversion, "id",pId);
        // if(pId === 4) {
        //     let m = m.substring(6);
        //     console.log(m.length,m);
        //     let nrBin = "";
        //     while(m.length > 4) {
        //         nrBin+=m.substring(1,5);
        //         console.log(nrBin);
                
        //         if(m[0] === 0) {
        //             break;
        //         }             
        //         m = m.substring(5);
        //     }
        // } else {
        //     let l = m.substring(6,7);
        //     let m = m.substring(7);
        //     let sub = [];
        //     console.log("l",l,"message",m);
        //     if(l === '0') {
        //         let count = m.substring(0,15);
                
        //         let it = Math.floor(parseInt(count,2)/11);
        //         console.log("__0__",count, parseInt(count,2),it);
        //         let rest = m.substring(15);
        //         for(let i = 0;i  < it; i++) {
        //             sub.push(rest.substring(0,11));
        //             rest = rest.substring(11);
        //         }
        //         sub[sub.length-1]+=rest.substring(0,parseInt(count,2)%11);
                
        //     } else {
        //         let count = m.substring(0,11);
        //         let it = Math.floor(parseInt(count,2));
        //         let rest = m.substring(11);
        //         console.log("__1__",count,it,rest);
        //         for(let i = 0;i  < it; i++) {
        //             sub.push(rest.substring(0,11));
        //             rest = rest.substring(11);
        //         }
                
        //     }
            
        //     //00000000011 
        //     //00000000001 
            
            
        //     console.log("subpackets",sub);
        //     for(let index in sub) {
                
        //         let pversions = parseInt( sub[index].substring(0,3), 2 );
        //         let pIds = parseInt( sub[index].substring(3,6), 2 );
        //         console.log("version",pversions, "id",pIds);
                
                
                
        //     }
            
        // }
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        /*
        function parseOperator(message) {
        console.log("__PARSE OP__", message);
        if(message.rest === "")
            return "";

        let l = message.rest.substring(0,1);
        let m = message.rest.substring(1);
        let sub = [];
        let restTrueLength = 1;
        let restOfMessage = "";
        console.log("lid", l,"message", m);
        if(l === '0') {
            let count = m.substring(0,15);
            let bitsLeft = parseInt(count,2);
            restTrueLength += 15+bitsLeft;
            console.log("__0__",count, parseInt(count,2));
            m = m.substring(15);
            let sub = [];
            while(bitsLeft > 0) {
                let pversion = parseInt( m.substring(0,3), 2 );
                let pId = parseInt( m.substring(3,6), 2 );
                let toParse = m.substring(6);
                bitsLeft-=6;
                console.log(bitsLeft,"||||||||",pversion,pId,toParse);
                sub.push(new Message(pversion,pId,""));
                console.log("PID",pId);
                if(pId === 4) {
                    console.log("new literal");
                    console.log(toParse);
                    let p = "";
                    do {
                        p = toParse.substring(0,5)
                        sub[sub.length-1].rest+=p;
                        toParse = toParse.substring(5);
                        bitsLeft-=5;
                        console.log(bitsLeft,p,toParse);
                    } while(p[0] === "1");
                    m = toParse;
                } else {
                    console.log("new operator with rest ",toParse);
                    sub[sub.length-1].rest=toParse;
                    bitsLeft = 0;
                }
                console.log(bitsLeft, toParse, sub);
            }
            console.log(sub);
            message.messages = sub;
        }
        else {
            let countBin = m.substring(0,11);
            let nrPackages = parseInt(countBin,2);
            let rest = m.substring(11);
            console.log("__1__","messages",parseInt(countBin,2),"rest",rest);
            for(let i = 0; i < nrPackages; i++) {
                let pversion = parseInt( rest.substring(0,3), 2 );
                let pId = parseInt( rest.substring(3,6), 2 );
                let toParse = rest.substring(6);
                restTrueLength+=6;
                console.log(i,"||||||||",pversion,pId,toParse);
                sub.push(new Message(pversion,pId,""));
                console.log("PID",pId);
                if(pId === 4) {
                    //literal
                    let p = "";
                    do {
                        p = toParse.substring(0,5)
                        restTrueLength+=5;
                        sub[sub.length-1].rest+=p;
                        toParse = toParse.substring(5);
                    }
                    while(p[0] === "1")
                    rest = toParse;
                    
                } else {
                    // operator
                    let lId = toParse.substring(0,1);
                    if(lId === '0') {
                        console.log("THANK FUCK FOR NORMAL SHIT");
                        sub[sub.length-1].rest = toParse;
                        rest = toParse.substring(16);
                    } else {
                        console.log("_________________GETTING CUCKED", rest);
                        
                        sub[sub.length-1].rest = toParse.substring(0);
                        let tl = parseMessage(sub[sub.length-1]);
                        if(tl === rest)
                        {
                            console.log("tl === rest");;
                            
                            return "";
                        }
                        rest = tl;
                        
                    }
                    console.log("NEW OPERATOR",rest)
                }
                
            }
            console.log("GOT REST ",rest);
            if(rest.length > 3) {
                restOfMessage = rest;
                
            }
            message.messages = sub;
            for(let subId in sub[sub.length-1].messages) {
                parseMessage(sub[sub.length-1].messages[subId]);
            }
        }
        
        console.log("REST OF MESSAGE",restOfMessage);
        return restOfMessage;
            
    }
    function parseLiteral(message) {
        let m = message.rest;
        console.log(m.length,m);
        let nrBin = "";
        while(m.length > 4) {
            nrBin+=m.substring(1,5);
            console.log(nrBin);
            
            if(m[0] === 0) {
                break;
            }             
            m = m.substring(5);
        }
        message.literal = parseInt(nrBin,2);
        console.log(message);
        return m;
    }
        
        */