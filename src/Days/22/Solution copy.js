import rawData from "./input.txt"
import {useState, useEffect} from "react"
import * as Utils from "./../Utils";




export function Solution22() {
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
        

        let commands = data.map((line)=>{return line.split(" ")});
        console.log(commands);
        commands = commands.map((line)=> {return [line[0],line[1].split(",").map((coord)=>{return Utils.stringToIntegerArr(coord.substring(2).split(".."))})]});

        console.log(commands);

        console.time("p1");
        const size = 50;
        let m = [];
        for(let z = 0; z <= size*2; z++) {
            m.push([]);
            for(let y = 0;y <= size*2; y++) {
                m[z].push([]);
                for(let x = 0;x <= size*2; x++) {
                    m[z][y].push(0);
                }
            }
        }
        console.log(m);



        for(let i = 0;i < commands.length; i++) {
            
            let xRange = commands[i][1][0];
            let yRange = commands[i][1][1];
            let zRange = commands[i][1][2];
            // console.log(i, xRange[0], xRange[1], yRange[0], yRange[1], zRange[0], zRange[1]);
            // console.log(x,y,z);
            if(xRange[1] > size || xRange[0] < -size ||
                yRange[1] > size || yRange[0] < -size ||
                zRange[1] > size || zRange[0] < -size
                ) {
                continue;
            }
            for(let z = zRange[0]; z <= zRange[1]; z++) {
                for(let y = yRange[0]; y <= yRange[1]; y++) {
                    for(let x = xRange[0]; x <= xRange[1]; x++) {
                        // console.log(z+size,y+size,x+size);
                        m[z+size][y+size][x+size] = commands[i][0] === "on" ? 1 : 0;
                        
                    }
                }   
            }



        }
        console.log(m);
        let sum1 = 0;
        
        for(let z = 0; z <= size*2; z++) {
            for(let y = 0;y <= size*2; y++) {
                for(let x = 0;x <= size*2; x++) {
                    if(m[z][y][x] === 1) {
                        sum1++;
                        
                    }
                }
            }
        }
        console.log(sum1);
        console.timeEnd("p1");




        setAns1(sum1);
        

        console.time("p2");


        function Region(startCorner = [0,0,0], endCorner = [0,0,0]) {
            
            this.startCorner = maxmax(startCorner,endCorner);
            this.endCorner = minmin(startCorner,endCorner);
            this.onCount = function(){
                return (Math.abs(endCorner[0]-startCorner[0])+1)*(Math.abs(endCorner[1]-startCorner[1])+1)*(Math.abs(endCorner[2]-startCorner[2])+1);
            }

            function pointEq(a,b) {
                if(a[0] === b[0] && a[1] === b[1] && a[2] === b[2]) return 0; // POINT IS THE SAME
            }
            function pointLarger(a,b) {
                return (a[0] >= b[0]) + (a[1] >= b[1]) + (a[2] >= b[2]); // returns nr of axii that is larger or equals
            }
            function minmin(a,b) {
                return [Math.min(a[0],b[0]),Math.min(a[1],b[1]),Math.min(a[2],b[2])];
            }
            function maxmax(a,b) {
                return [Math.max(a[0],b[0]), Math.max(a[1],b[1]), Math.max(a[2],b[2])];
            }
            this.inside = function(other) { // other inside this
                return this.insideCorners(other.startCorner, other.endCorner);
            }
            this.insideCorners = function(startCorner, endCorner) {
                let s = pointLarger(this.startCorner, startCorner);
                let e = pointLarger(endCorner, this.endCorner);
                return s === 3 && e === 3;
            }
            this.overlaps = function(other) {
                return this.overlapsCorner(other.startCorner,other.endCorner);
            }
            this.overlapsCorner = function(startCorner, endCorner) {
                if(
                    (pointLarger(this.startCorner, startCorner) === 3 && pointLarger(startCorner, this.endCorner) === 3 )||
                    (pointLarger(this.startCorner, endCorner) === 3 && pointLarger(endCorner, this.endCorner) === 3 ) ||
                    (pointLarger(startCorner, this.startCorner) === 3 && pointLarger(this.startCorner, endCorner) === 3 )||
                    (pointLarger(startCorner, this.endCorner) === 3 && pointLarger(this.endCorner, endCorner) === 3 ) 
                ) return true;
                return false;
            }
            this.cut = function(other) {
                // remove other from this
                // console.log("this",this.startCorner,this.endCorner, "other",other.startCorner, other.endCorner);
                // cut by x


                let xArr = [];
                
                // new.end < old.end && old.end < new.start
                xArr.push(this.startCorner[0]);
                if(this.startCorner[0] > other.startCorner[0] && other.startCorner[0] > this.endCorner[0]) {
                    xArr.push(other.startCorner[0]+1);
                    xArr.push(other.startCorner[0]);

                }
                if(this.startCorner[0] > other.endCorner[0] && other.endCorner[0] > this.endCorner[0]) {
                    xArr.push(other.endCorner[0]);
                    xArr.push(other.endCorner[0]-1);
                }
                xArr.push(this.endCorner[0]);
                // console.log("xArr",xArr)

                let yArr = [];
                yArr.push(this.startCorner[1]);
                if(this.startCorner[1] > other.startCorner[1] && other.startCorner[1] > this.endCorner[1]) {
                    yArr.push(other.startCorner[1]+1);
                    yArr.push(other.startCorner[1]);
                }
                if(this.startCorner[1] > other.endCorner[1] && other.endCorner[1] > this.endCorner[1]) {
                    yArr.push(other.endCorner[1]);
                    yArr.push(other.endCorner[1]-1);
                }
                yArr.push(this.endCorner[1]);
                // console.log("yArr",yArr)

                let zArr = [];
                zArr.push(this.startCorner[2]);
                if(this.startCorner[2] > other.startCorner[2] && other.startCorner[2] > this.endCorner[2]) {
                    zArr.push(other.startCorner[2]+1);
                    zArr.push(other.startCorner[2]);
                }
                if(this.startCorner[2] > other.endCorner[2] && other.endCorner[2] > this.endCorner[2]) {
                    zArr.push(other.endCorner[2]);
                    zArr.push(other.endCorner[2]-1);
                }
                zArr.push(this.endCorner[2]);
                // console.log("zArr",zArr)


                let regions = []; let oSpace = this.onCount(); let space = 0; let removedSpace = 0;
                for(let x = 0; x < xArr.length; x+=2) {
                    for(let y = 0; y < yArr.length; y+=2) {
                        for(let z = 0; z < zArr.length; z+=2) {
                            let pStart = [xArr[x],yArr[y],zArr[z]];
                            let pEnd = [xArr[x+1],yArr[y+1],zArr[z+1]];
                            if(!other.overlapsCorner(pStart,pEnd)) {
                                // console.log("(",xArr[x],yArr[y],zArr[z],")","(",xArr[x+1],yArr[y+1],zArr[z+1],")");
                                
                                let temp = new Region(pStart,pEnd);
                                space += temp.onCount();
                                regions.push(temp);
                                
                            } else {
                                // console.log("\t\t(",xArr[x],yArr[y],zArr[z],")","(",xArr[x+1],yArr[y+1],zArr[z+1],")");
                                let temp = new Region(pStart,pEnd);
                                // space += temp.onCount();
                                removedSpace += temp.onCount();

                            }
                        }
                    }
                }

                if(oSpace !== (space+removedSpace)) {
                    console.log("NOT THE SAME SPACE");
                    console.log("\t",oSpace, space, removedSpace);
                }
                if(regions.length >= 18) {
                    // console.log("NO VALID REGIONS FOUND");
                    console.log(this.startCorner[0], "|",other.startCorner[0], other.endCorner[0], "|" ,this.endCorner[0]);
                    console.log(this.startCorner[1], "|",other.startCorner[1], other.endCorner[1], "|" ,this.endCorner[1]);
                    console.log(this.startCorner[2], "|",other.startCorner[2], other.endCorner[2], "|" ,this.endCorner[2]);
                    // console.log("NO VALID REGIONS FOUND");
                    console.log(xArr,yArr,zArr);
                    for(let x = 0; x < xArr.length; x+=2) {
                        for(let y = 0; y < yArr.length; y+=2) {
                            for(let z = 0; z < zArr.length; z+=2) {
                                let pStart = [xArr[x],yArr[y],zArr[z]];
                                let pEnd = [xArr[x+1],yArr[y+1],zArr[z+1]];
                                if(!other.overlapsCorner(pStart,pEnd)) {
                                    console.log("(",xArr[x],yArr[y],zArr[z],")","(",xArr[x+1],yArr[y+1],zArr[z+1],")");
                                    //regions.push(new Region(pStart,pEnd));
                                } else {
                                    console.log("\t\t(",xArr[x],yArr[y],zArr[z],")","(",xArr[x+1],yArr[y+1],zArr[z+1],")");
                                }
                            }
                        }
                    }
                }
                return regions;
            }


        } 

        
        console.log(" ");
        console.log(" ");
        console.log(" ");
        console.log(" ");
        let regions = [];
        for(let commandIndex = 0; commandIndex < commands.length; commandIndex++) {
            const type = commands[commandIndex][0];
            const xRange = commands[commandIndex][1][0];
            const yRange = commands[commandIndex][1][1];
            const zRange = commands[commandIndex][1][2];
            console.group(commandIndex);
            console.log(type, xRange,yRange,zRange);
            
            if(type === "on") {
                let inside = false;
                let overlaps =  false;
                let region = new Region([xRange[1],yRange[1],zRange[1]],[xRange[0],yRange[0],zRange[0]]);
                let subRegions = [];
                for(let r = 0; r < regions.length; r++) {
                    // console.group("Region"+r);
                    if(overlaps === false) {
                        // check against the original region
                        if(regions[r].inside(region)) {
                            // console.log("INSIDE");
                            inside = true;
                            console.groupEnd();
                            break;
                        }
                        if(regions[r].overlaps(region)) {
                            // console.log("OVERLAPS");
                            overlaps = true;
                            let subr = region.cut(regions[r]);
                            // console.log(subRegions,subr);
                            subRegions = subRegions.concat(subr);
                            console.log("Created ",subr.length," new subr", subr);
                        } else {
                            // console.log("no overlap");
                        }
                        
                    } else {
                        // check subregions of original region
                        let length = subRegions.length;
                        // console.log(r,[...subRegions]);
                        // console.group("subregions");
                        // for(let i = originalSize; i >= 0; i--) {
                        for(let i = 0; i < length; i++) {
                            // console.log(i,length);
                            if(regions[r].inside(subRegions[i])) {
                                // console.log("INSIDE "+i);
                                console.log("removing", subRegions[i].onCount());
                                subRegions.splice(i,1);
                                i--;
                                length = subRegions.length
                                continue;
                            }
                            if(regions[r].overlaps(subRegions[i])) {
                                // console.log("OVERLAPS "+i, "| REGION ",r,[...regions[r].startCorner],[...regions[r].endCorner],"|| SUBREGION",[...subRegions[i].startCorner] ,[...subRegions[i].endCorner]);
                                let subr = subRegions[i].cut(regions[r]);
                                let summm = 0;
                                subr.forEach((reg,i)=>{
                                    summm+=reg.onCount();
                                });
                                console.log("removing", subRegions[i].onCount()-summm,"|", subRegions[i].onCount(), summm);

                                // console.log(r,i,[...subr]);
                                // console.log("adding ", subr.length, "new subRegions");
                                subRegions.splice(i,1,...subr);
                                i--
                                r = 0;
                            } else {
                                // console.log("no overlap "+i);
                            }
                            length = subRegions.length
                        }
                        // console.groupEnd();



                        // FIX SUBREGIONS ITERATIONS IDK




                    }
                    // console.groupEnd();
                }
                if(inside === true) {
                    continue;
                }
                if(overlaps === false) { // regions probably empty, add new
                    regions.push(region);
                } else { // add all subregions to regions
                    // console.log("Subregions", subRegions);
                    regions = regions.concat(subRegions); 
                }
            } else {


            }
            
            console.log("regions",[...regions]);
            console.groupEnd();
        }


        for(let i = 0; i < regions.length; i++) {
            for(let u = 0; u < regions.length; u++) {
                if(u === i)
                    continue;
                if(regions[i].overlaps(regions[u])) {
                    console.log("regions ",i , u, " overlap", regions[u].onCount());
                }
            }
        }

        // for(let i = 1; i < regions.length; i++) {
        //     const overlaps = regions[i-1].overlaps(regions[i]);
        //     console.log(i-1, i, overlaps, regions[i-1]);
            
        // }

        console.log(regions);


        let sum2 = 0;

        regions.forEach((region,i)=>{
            // let s = region.onCount();
            // console.log(i,s);
            sum2+=region.onCount();
        });


        setAns2(sum2);
        console.timeEnd("p2");
    }
    
    
    return (
        <div>
            <div>{answer1}</div>
            <div>{answer2}</div>
            {/* <div>2758514936282235</div> */}
        </div>
    )
}

