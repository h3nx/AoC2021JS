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
            
            this.startCorner = startCorner;
            this.endCorner = endCorner;
            this.onCount = function(){
                return  (Math.abs(endCorner[0]-startCorner[0])+1)*
                        (Math.abs(endCorner[1]-startCorner[1])+1)*
                        (Math.abs(endCorner[2]-startCorner[2])+1);
            }
            function minCorner(a,b) {
                return [
                    Math.min(a[0], b[0]),
                    Math.min(a[1], b[1]),
                    Math.min(a[2], b[2])
                ];
                // return [
                //     Math.min(this.startCorner[0], other.startCorner[0]),
                //     Math.min(this.startCorner[1], other.startCorner[1]),
                //     Math.min(this.startCorner[2], other.startCorner[2])
                // ];
            }
            function maxCorner(a,b) {
                return [
                    Math.max(a[0], b[0]),
                    Math.max(a[1], b[1]),
                    Math.max(a[2], b[2])
                ];
            }

            this.intersect = function(other) {
                const max = minCorner(this.startCorner,other.startCorner);
                const min = maxCorner(this.endCorner,other.endCorner);
                return !(!(min[0] <= max[0]) || !(min[1] <= max[1]) || !(min[2] <= max[2])); 
            }
            this.commonRegion = function(other) {
                return new Region(
                    minCorner(this.startCorner, other.startCorner),
                    maxCorner(this.endCorner, other.endCorner)
                );
            }
            this.cut = function(other) {
                if(!this.intersect(other)) return [];
                // let common = this.commonRegion(other);
                const common = this.commonRegion(other);
                // console.group("CUT");
                // console.log("this",this.onCount(), this.startCorner,this.endCorner);
                // console.log("common",common.onCount(), common.startCorner,common.endCorner);
                // console.log("other",other.onCount(), other.startCorner,other.endCorner);
                // console.log(this.onCount()-common.onCount()+other.onCount());

                let regions = [];

                if(this.startCorner[0] > common.startCorner[0]) {
                    regions.push(new Region(
                        [...this.startCorner],
                        [
                            common.startCorner[0]+1,
                            this.endCorner[1],
                            this.endCorner[2]
                        ],
                        ));
                    }
                if(this.endCorner[0] < common.endCorner[0]) {
                    regions.push(new Region(
                        [
                            common.endCorner[0]-1,
                            this.startCorner[1],
                            this.startCorner[2]
                        ],
                        [...this.endCorner]
                    ));
                }

                if(this.endCorner[1] < common.endCorner[1]) {
                    regions.push(new Region(
                        [
                            common.startCorner[0],
                            common.endCorner[1]-1,
                            this.startCorner[2]                            
                        ],
                        [
                            common.endCorner[0],
                            this.endCorner[1],
                            this.endCorner[2],
                        ]
                    ));
                }
                if(this.startCorner[1] > common.startCorner[1]) {
                    regions.push(new Region(
                        [
                            common.startCorner[0],
                            this.startCorner[1],
                            this.startCorner[2]                            
                        ],
                        [
                            common.endCorner[0],
                            common.startCorner[1]+1,
                            this.endCorner[2],
                        ]
                    ));
                }


                if(this.endCorner[2] < common.endCorner[2]) {
                    regions.push(new Region(
                        [
                            common.startCorner[0],
                            common.startCorner[1],
                            common.endCorner[2]-1
                        ],
                        [
                            common.endCorner[0],
                            common.endCorner[1],
                            this.endCorner[2]
                        ]
                    ));
                }
                if(this.startCorner[2] > common.startCorner[2]) {
                    regions.push(new Region(
                        [
                            common.startCorner[0],
                            common.startCorner[1],
                            this.startCorner[2]
                        ],
                        [
                            common.endCorner[0],
                            common.endCorner[1],
                            common.startCorner[2]+1
                        ]
                    ));
                }


                let sum = 0;
                regions.forEach((reg)=>{sum += reg.onCount()});

                // console.log("new region sum", sum, this.onCount()-common.onCount());
                // console.groupEnd();
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

            let region = new Region([xRange[1],yRange[1],zRange[1]],[xRange[0],yRange[0],zRange[0]]);
            let toRemove = [];
            let newRegions = [];
            for(let regionIndex = 0; regionIndex < regions.length; regionIndex++) {
                if(region.intersect(regions[regionIndex])) { //remove if on edge and add new
                    // console.log(regionIndex, " intersect");
                    toRemove.unshift(regionIndex);
                    let subr = regions[regionIndex].cut(region);
                    newRegions = newRegions.concat(subr);
                }
            }
            // REMOVE INTERSECTED REGIONS
            console.log("regions",regions.length,"removed regions ", toRemove.length," new regions", newRegions.length);
            for(let i = 0; i < toRemove.length; i++) {
                regions.splice(toRemove[i],1);
            }
            // ADD NEWLY CREATED REGIONS
            regions = regions.concat(newRegions);

            // IF ON ADD NEW REGION
            if(type === "on") {
                regions.push(region);
                // console.log("Adding ", region.onCount());
            }
            // console.log("Regions",[...regions]);
            console.groupEnd();
        }

        console.group("Overlaps");
        for(let i = 0; i < regions.length; i++) {
            for(let u = 0; u < regions.length; u++) {
                if(u === i)
                    continue;
                if(regions[i].intersect(regions[u])) {
                    console.log("regions ",i , u, " overlap", regions[u].onCount());
                }
            }
        }
        console.groupEnd();
        console.log(regions);


        let sum2 = 0;

        regions.forEach((region,i)=>{
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

