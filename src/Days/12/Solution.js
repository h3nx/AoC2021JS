import rawData from "./input.txt"
import {useState, useEffect} from "react"
import * as Utils from "./../Utils";




export function Solution12() {
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
    
    
    
    function Node(name) {
        this.name = name;
        this.parent = null;
        this.children = [];
        this.hasTwo = false;
        this.makeMap = function(m) {
            m[this.name].forEach((path) => {
                let c = null;
                if(Utils.isLower(path)) {
                    if(!this.hasParent(path)){
                        // console.log("adding child lower",path);
                        c = this.addChild(path);
                    } else if(this.hasTwo === false) {
                        c = this.addChild(path);
                        c.hasTwo = true;
                    }
                }
                else {
                    c = this.addChild(path);
                }
                if(c !== null)
                    if(path !== "end")
                        c.makeMap(m); 
            }) ;
        }
        this.addChild = function(name) {
            let c = new Node(name);
            c.parent = this;
            c.hasTwo = this.hasTwo;
            this.children.push(c);
            return c;
        };
        this.hasParent = function (name) {
            if(this.parent === null)
                return false;
            if(this.parent.name === name)
                return true;
            return this.parent.hasParent(name);
        }
        this.printTree = function () {
            console.log(this);
            for (var key in this.children){
                if (this.children.hasOwnProperty(key)) {
                    this.children[key].printTree();
                }
            }
        }
        this.countChildrenWithName = function(name) {
            let sum = name === this.name ? 1:0;
            this.children.forEach((c)=> {
                sum += c.countChildrenWithName(name);
            })
            return sum;
        }
    }
    
    
    
    
    
    
    function solve(data) {
        console.log(data);
        
        const indivPaths = data.map((line)=>{return line.split("-")});
        
        let connections = [];
        
        indivPaths.forEach((arr)=> {
            if(connections[arr[0]] === undefined)
                connections[arr[0]] = [];
            if(connections[arr[1]] === undefined)
                connections[arr[1]] = [];
            if(arr[0] !== "end")
                connections[arr[0]].push(arr[1])
            if(arr[0] !== "start")
                connections[arr[1]].push(arr[0])
                
        });
        // console.log(connections["start"]);
        for (var k in connections){
            if (connections.hasOwnProperty(k)) {
                 console.log(k,connections[k]);
            }
        }
        
        
        let root1 = new Node("start");
        root1.hasTwo = true;
        root1.makeMap(connections);
        console.log(root1);
        let sum = root1.countChildrenWithName("end");
        setAns1(sum);
        
        
        let root2 = new Node("start");
        root2.makeMap(connections);
        console.log(root2);
        let sum2 = root2.countChildrenWithName("end");
        setAns2(sum2);
        
        
       
    }
    
    
    
    
    
    return (
        <div>
            <div>{answer1}</div>
            <div>{answer2}</div>
        </div>
    )
}

 // for (var k in connections){
        //     if (connections.hasOwnProperty(k)) {
        //          console.log(k + ": " + connections[k]);
        //     }
        // }
        
        
        // let count = 0;
        // let possibilities = [];
        // let running = true;
        
        // traverse("start");
        
        // function traverse(name) {
        //     // possibilities[name] = [];
        //     console.log(connections);
        //     for (var key in connections[name]){
        //         console.log(key);
        //         if (connections.hasOwnProperty(key)) {
                    
        //             console.log(key + ": " + connections[key]);
        //             if(key !== "end")
        //                 traverse(connections[key]);
        //         }
        //     }
        
        // }