import rawData from "./input.txt"
import {useState, useEffect} from "react"
import * as Utils from "./../Utils";




export function Solution18() {
    // eslint-disable-next-line
    const [answer1, setAns1] = useState(-1);
    // eslint-disable-next-line
    const [answer2, setAns2] = useState(-1);
    
    // onload
    useEffect(()=> {
        console.time("total");
        fetch(rawData)
        .then(r => r.text())
        .then(text => {
            solve(Utils.SplitByNewLine(text));
            console.timeEnd("total");
        });
    },[]);
    
    
    function Node(parent,value = -1,left = null, right = null) {
        this.parent = parent;
        this.left = left;
        this.right = right;
        this.value = value;
        this.sum = function() {
            if(this.value > -1)
                return this.value;
            let l = 3*(this.left === null ? 0 : this.left.sum()); 
            let r = 2*(this.right === null ? 0 : this.right.sum());
            return l+r;
        }
        this.getRoot = function() {
            return this.parent === null ? this : this.parent.getRoot();
        }
        this.leftmost = function() {
            let temp = this.getRoot();
            while(temp.value == -1) {
                if(temp.left !== null)
                    temp = temp.left;
                else if(temp.left !== null)
                    temp = temp.right;
            }
            return temp;
        }
        this.getDepth = function() {
            let depth = 0;
            let current = this;
            while(current.parent !== null) {
                depth++;
                current = current.parent;
            }
            return depth;
        }
        this.add = function(nr = 1) {
            this.value+=nr;
            if(this.value>9) {
                parent.split();
                return true;
            }
            return false;
        }
        this.nextRight = function() {
            let current = this.parent;
            let prev = this;
            while(current.right === null || current.right === prev) {
                if(current.parent === null)
                    return null;
                prev = current;
                current = current.parent;
            }
            current = current.right;
            while(current.value === -1) {
                if(this === current)
                    return null;
                if(current.left !== null)
                    current = current.left;
                else
                    current = current.right;
            }
            return current;
        }
        this.nextLeft = function() {
            let current = this.parent;
            let prev = this;
            while(current.left === null || current.left === prev) {
                if(current.parent === null)
                    return null;
                prev = current;
                current = current.parent;
            }
            current = current.left;
            
            while(current.value === -1) {
                if(this === current)
                    return null;
                if(current.right !== null)
                    current = current.right;
                else
                    current = current.left;
            }
            return current;
        }
        this.explode = function() {
            // console.log("explode", this.print());
            if(this.right === null || this.left === null)
                return false;
            // console.log("\t",this.getRoot().print());
            let l = this.nextLeft();
            let r = this.nextRight();
            
            // console.log(
            //     "\t",
            //     l === null ? " x ":l.print(),
            //     ",",
            //     this.print(), 
            //     ",", 
            //     r === null ? " x ":r.print()
            // );
            if(l !== null) {
                if(this.left !== null) {
                    l.value += this.left.value;
                } else {
                    console.log("left == null");
                }
            }
            if(r !== null) {
                if(this.right !== null) {
                    r.value += this.right.value;
                } else {
                    console.log("right == null");
                }
            }
            this.left = null;
            this.right = null;
            this.value = 0;
            // console.log("\t",this.getRoot().print());
            // if(l !== null)
            //     l.reduce();
            // if(r !== null)
            //     r.reduce();
            // this.parent.reduce();
            return true;
            
        }
        this.split = function() {
            // console.log("split", this.print());
            // console.log("\t",this.getRoot().print());
            this.left = new Node(this, Math.floor(this.value/2));
            this.right = new Node(this, Math.ceil(this.value/2));
            this.value = -1;
            // console.log("\t",this.getRoot().print());
            // this.parent.reduce();
            // this.reduce();
            return true;
        }
        this.reduce = function() {
            // console.log(this.getRoot().print());
            if(this.reduceExplosion())
                return true;
            if(this.reduceSplit())
                return true;
            return false;
        }
        this.reduceExplosion = function() {
            let depth = this.getDepth();
            if(depth > 4) {
                this.parent.explode();
                return true;
            }
            let r = this.nextRight();
            if(r != null) {
                if(r.reduceExplosion())
                    return true;
            }
            return false;
        }
        this.reduceSplit = function() {
            if(this.value > 9) {
                this.split();
                return true;
            }
            let r = this.nextRight();
            if(r != null) {
                if(r.reduceSplit())
                    return true;
            }
            return false;
        }
        this.print = function() {
            let str = "";
            if(this.value > -1)
                return this.value;
            if(this.left !== null) {
                str += "["+this.left.print();
            }
            if(this.right !== null) {
                str += ","+this.right.print()+"]";
            }
            return str;
        }
    }
    
    function parse(line) {
        let root = new Node(null);
            let prev = root;
            for(let i = 0; i < line.length; i++) {
                const char = line[i];
                if(char === "[") {
                    prev.left = new Node(prev);
                    prev = prev.left;
                } else if(char === ",") {
                    prev.parent.right = new Node(prev.parent);  
                    prev = prev.parent.right;
                } else if(char === "]") {
                    prev = prev.parent;
                } else {
                    // NUMBER
                    prev.value = parseInt(char);
                    
                }
            }
            return root;
    }
    function solve(data) {
        console.log(data);
          
        console.time("1");
        let current = null;
        let parsed = data.map((line)=> {
            return parse(line);
        });
        console.log(parsed);
        let p0 = parsed[0].print();
        let p1 = parsed[1].print();
        current = addTrees(parsed[0],parsed[1]);
        console.log(p0," + "+p1,"\t = \n",current.print());
        for(let i = 2; i < parsed.length; i++) {
        // for(let i = 2; i < 2; i++) {
            let prevPrint = current.print();
            let n = parsed[i].print();
            current = addTrees(current,parsed[i]);
            // console.log(prevPrint," + ",n, " = \n", current.print());
            // console.log(current);
            
        }
        // let temp = parse("[[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]]");
        // console.log("TEMP\n",temp.print());
        // while(temp.leftmost().reduce());
        
        // console.log(temp.print());
        // console.log(parse("[[1,2],[[3,4],5]]").sum());
        // console.log(parse("[[[[0,7],4],[[7,8],[6,0]]],[8,1]]").sum());
        // console.log(parse("[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]").sum());
        
        
        let sum1 = current.sum();
        console.log(sum1);
        setAns1(sum1);
        console.timeEnd("1");
        
        let parsed2 = data.map((line)=> {
            return parse(line);
        });
        
        console.time("2");
        
        let max = 0;
        data.forEach((line1)=> {
            data.forEach((line2)=> {
                let s1 = addTrees(parse(line1),parse(line2)).sum();
                if(s1 > max)
                    max = s1;
                let s2 = addTrees(parse(line2),parse(line1)).sum()
                if(s2 > max)
                    max = s2;
            });
        });
        
        
        
        
        
        
        
        
        
        
        let sum2 = max;
        setAns2(sum2);
        console.timeEnd("2");
    }
    function addTrees(right, left) {
        let root = new Node(null, -1, right, left);
        left.parent = root;
        right.parent = root;
        // console.log("reduce:",root.print());
        while(root.leftmost().reduce());
        return root;
    }
    return (
        <div>
            <div>{answer1}</div>
            <div>{answer2}</div>
        </div>
    )
}



/**if(depth > 4) {
                return this.parent.explode();
            }
            while(true) {
                if(this.left !== null) {
                    if(!this.left.reduce())
                        break;
                } else 
                break;
            }
            while(true) {
                if(this.right !== null) {
                    if(!this.right.reduce())
                        break;
                } else 
                break;
            }
            if(this.value > 9) {
                return this.split();
            } */