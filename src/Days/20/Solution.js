import rawData from "./input.txt"
import {useState, useEffect} from "react"
import * as Utils from "./../Utils";




export function Solution20() {
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
        // console.log(data);
          
        const algo = Utils.ReplaceNewlineWithNothing(data[0]).split("");
        let image = Utils.SplitByNewLine(data[1]).map((line)=>{return line.split("")});
        
        console.log("algo",algo);
        console.log("image",image);
        
        
        let steps = 50;
        let resizedImage = Utils.copy2dArr(image);
        
        // Utils.printTable20(resizedImage,resizedImage[0].length,resizedImage.length);
        for(let y = 0; y < resizedImage.length; y++) {
            for(let i = 0; i < steps*2; i++) {
                resizedImage[y].unshift(".");
                resizedImage[y].push(".");
            }
        }
        // Utils.printTable20(resizedImage,resizedImage[0].length,resizedImage.length);
        for(let y = 0; y < steps*2; y++) {
            resizedImage.unshift([]);
            resizedImage.push([]);
            for(let x = 0; x < resizedImage[0+steps*2].length; x++) {
                resizedImage[0].push(".");
                resizedImage[resizedImage.length-1].push(".");
            }
            
        }
        // Utils.printTable20(resizedImage,resizedImage[0].length,resizedImage.length);
        
        console.log("res",resizedImage);
        // Utils.printTable20(image,image[0].length,image.length);
        // Utils.printTable20(resizedImage,resizedImage[0].length,resizedImage.length);
        
        const xSize = resizedImage[0].length;
        const ySize = resizedImage.length;
        let result = Utils.copy2dArr(resizedImage);
        // Utils.printTable20(result,result[0].length,result.length);
        for(let iterations = 0; iterations < steps; iterations++){
            let current = Utils.copy2dArr(result);
            for(let y = 0; y < ySize; y++) {
                for(let x = 0; x < xSize; x++) {
                    let n = Utils.getNeighbours2d(x,y,xSize-1,ySize-1,true, true);
                    n.sort((a,b)=>{return 10000*(a[1]-b[1])+(a[0]-b[0])});
                    let bin = n.map((coord)=> {return current[coord[1]][coord[0]] === "." ? "0" : "1"}).join("");
                    let algoI = parseInt(bin,2);
                    // console.log("bin",bin, );
                    result[y][x] = algo[algoI];
                    // n.forEach((coord)=>{console.log(current[coord[1]][coord[0]])});
                }
            }
            console.log("iteration",iterations);
            // Utils.printTable20(result,result[0].length,result.length);
        }
        
        
        let n = Utils.getNeighbours2d(5,5,xSize-1,ySize-1,true, true);
        n.sort((a,b)=>{return 10000*(a[1]-b[1])+(a[0]-b[0])});
        console.log(n);
        
        let s = 0;
        
        for(let y = 0; y < ySize; y++) {
            for(let x = 0; x < xSize; x++) {
                if(result[y][x] === "#")
                s++;
            }
        }
    
        let sum1 = s;
        setAns1(sum1);
        
        let sum2 = 0;
        setAns2(sum2);
    }
    
    
    return (
        <div>
            <div>{answer1}</div>
            <div>{answer2}</div>
        </div>
    )
}

