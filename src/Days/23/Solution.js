import rawData from "./input.txt"
import {useState, useEffect} from "react"
import * as Utils from "./../Utils";




export function Solution23() {
    // eslint-disable-next-line
    const [answer1, setAns1] = useState(-1);
    // eslint-disable-next-line
    const [answer2, setAns2] = useState(-1);
    
    useEffect(()=> {
        console.time("Total");
        fetch(rawData)
        .then(r => r.text())
        .then(text => {
            solve(Utils.SplitByNewLine(""));
            console.timeEnd("Total");
        });
        
    },[]);
    



    function Map(nests, board) {
        this.nests = nests;


    }

    function makeMove(nests, board) {
        console.log(nests);
        console.log(board);

        

    }



    function solve(data) {
        console.log(data);
          
        let cost = [];
        cost["A"] = 1;
        cost["B"] = 10;
        cost["C"] = 100;
        cost["D"] = 1000;

        let sum1 = 0;
        sum1 += 2*cost["D"];
        sum1 += 9*cost["A"];
        sum1 += 3*cost["D"];
        sum1 += 4*cost["D"];
        sum1 += 3*cost["A"];
        sum1 += 2*cost["B"];
        sum1 += 6*cost["C"];
        sum1 += 3*cost["B"];
        sum1 += 6*cost["C"];
        sum1 += 5*cost["B"];
        sum1 += 7*cost["A"];
        sum1 += 2*cost["A"];
        
        console.log(sum1);
        setAns1(sum1);



        let sum2 = 0;
        sum2 += 5*cost["D"];
        sum2 += 8*cost["B"];
        sum2 += 6*cost["A"];
        sum2 += 5*cost["A"];



        sum2 += 9*cost["C"];
        sum2 += 4*cost["B"];
        sum2 += 7*cost["C"];
        sum2 += 4*cost["B"];
        sum2 += 8*cost["C"];


        sum2 += 5*cost["B"];
        sum2 += 6*cost["B"];
        sum2 += 6*cost["B"];


        

        sum2 += 4*cost["D"];
        sum2 += 4*cost["D"];
        sum2 += 7*cost["B"];

        sum2 += 9*cost["A"];
        sum2 += 10*cost["A"];
        
        
        
        sum2 += 2*cost["D"];
        
        
        sum2 += 10*cost["A"];
        sum2 += 6*cost["C"];
        sum2 += 11*cost["A"];


        

        sum2 += 5*cost["D"];
        sum2 += 5*cost["D"];
        sum2 += 9*cost["D"];
        sum2 += 9*cost["D"];
        //46451




        setAns2(sum2);
    }
    
    
    return (
        <div>
            <div>{answer1}</div>
            <div>{answer2}</div>
        </div>
    )
}






 // sum2 += 5*cost["D"];
        // sum2 += 7*cost["B"];
        // sum2 += 5*cost["A"];
        // sum2 += 5*cost["A"];

        // sum2 += 9*cost["C"];
        // sum2 += 3*cost["B"];
        // sum2 += 7*cost["C"];
        // sum2 += 4*cost["B"];
        // sum2 += 8*cost["C"];

        // sum2 += 5*cost["B"];
        // sum2 += 5*cost["B"];
        // sum2 += 5*cost["B"];

        // sum2 += 4*cost["D"];
        // sum2 += 4*cost["D"];
        // sum2 += 7*cost["B"];

        // sum2 += 9*cost["A"];
        // sum2 += 9*cost["A"];

        // sum2 += 2*cost["D"];

        // sum2 += 10*cost["A"];
        // sum2 += 6*cost["C"];
        // sum2 += 11*cost["A"];



        

        /**
         * sum2 += 5*cost["D"];
        sum2 += 5*cost["B"];
        sum2 += 5*cost["A"];
        sum2 += 5*cost["A"];



        sum2 += 9*cost["C"];
        sum2 += 3*cost["B"];
        sum2 += 8*cost["C"];
        sum2 += 4*cost["B"];
        sum2 += 8*cost["C"];


        sum2 += 9*cost["A"];
        sum2 += 9*cost["A"];
        sum2 += 6*cost["B"];
        sum2 += 2*cost["D"];


        

        sum2 += 5*cost["D"];
        sum2 += 5*cost["B"];
        sum2 += 5*cost["A"];
        sum2 += 5*cost["A"];
        
        
        
        sum2 += 9*cost["A"];
        sum2 += 6*cost["C"];
        sum2 += 11*cost["A"];


        

        sum2 += 5*cost["D"];
        sum2 += 5*cost["D"];
        sum2 += 9*cost["D"];
        sum2 += 9*cost["D"];
         * 
         * 
         * 
         * 
         */







        


        // sum2 += 5*cost["D"];
        
        
        // sum2 += 4*cost["D"];
        // sum2 += 4*cost["D"];
        // sum2 += 5*cost["B"];




        // sum2 += 10*cost["A"];
        // sum2 += 10*cost["A"];


        // sum2 += 2*cost["D"];
        // sum2 += 9*cost["A"];
        // sum2 += 6*cost["C"];
        // sum2 += 11*cost["A"];





        // sum2 += 11*cost["D"];
        // sum2 += 11*cost["D"];
        // sum2 += 3*cost["D"];
        // sum2 += 3*cost["D"];

        


// no 46413
// no 46409
// no 43388