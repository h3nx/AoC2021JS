import {Routes, Route, Link } from "react-router-dom"
import { Solution1 } from "./1/Solution";
import { Solution2 } from "./2/Solution";
import { Solution3 } from "./3/Solution";
import { Solution4 } from "./4/Solution";
import { Solution5 } from "./5/Solution";
import { Solution6 } from "./6/Solution";
import { Solution7 } from "./7/Solution";
import { Solution8 } from "./8/Solution";
import { Solution9 } from "./9/Solution";
import { Solution10 } from "./10/Solution";
import { Solution11 } from "./11/Solution";
import { Solution12 } from "./12/Solution";
import { Solution13 } from "./13/Solution";
import { Solution14 } from "./14/Solution";
import { Solution15 } from "./15/Solution";
import { Solution16 } from "./16/Solution";
import { Solution17 } from "./17/Solution";
import { Solution18 } from "./18/Solution";
import { Solution19 } from "./19/Solution";
import { Solution20 } from "./20/Solution";
import { Solution21 } from "./21/Solution";
import { Solution22 } from "./22/Solution";
import { Solution23 } from "./23/Solution";
import { Solution24 } from "./24/Solution";
import { Solution25 } from "./25/Solution";

function Index() {
    
    return(
        <div className="f c" style={{margin:"40px"}}>
            <Link to={"/solutions/1"}>Day 1 **</Link>
            <Link to={"/solutions/2"}>Day 2 **</Link>
            <Link to={"/solutions/3"}>Day 3 **</Link>
            <Link to={"/solutions/4"}>Day 4 **</Link>
            <Link to={"/solutions/5"}>Day 5 **</Link>
            <Link to={"/solutions/6"}>Day 6 **</Link>
            <Link to={"/solutions/7"}>Day 7 **</Link>
            <Link to={"/solutions/8"}>Day 8 **</Link>
            <Link to={"/solutions/9"}>Day 9 **</Link>
            <Link to={"/solutions/10"}>Day 10 **</Link>
            <Link to={"/solutions/11"}>Day 11 **</Link>
            <Link to={"/solutions/12"}>Day 12 **</Link>
            <Link to={"/solutions/13"}>Day 13 **</Link>
            <Link to={"/solutions/14"}>Day 14 **</Link>
            <Link to={"/solutions/15"}>Day 15 **</Link>
            <Link to={"/solutions/16"}>Day 16 </Link>
            <Link to={"/solutions/16"}>Day 17 </Link>
            <Link to={"/solutions/16"}>Day 18 </Link>
            <Link to={"/solutions/16"}>Day 19 </Link>
            <Link to={"/solutions/16"}>Day 20 </Link>
            <Link to={"/solutions/16"}>Day 21 </Link>
            <Link to={"/solutions/16"}>Day 22 </Link>
            <Link to={"/solutions/16"}>Day 23 </Link>
            <Link to={"/solutions/16"}>Day 24 </Link>
            <Link to={"/solutions/16"}>Day 25 </Link>
        </div>
    ); 
}

function Solutions() {
    return (
        <Routes>
            <Route path="1" element={<Solution1/>}/>
            <Route path="2" element={<Solution2/>}/>
            <Route path="3" element={<Solution3/>}/>
            <Route path="4" element={<Solution4/>}/>
            <Route path="5" element={<Solution5/>}/>
            <Route path="6" element={<Solution6/>}/>
            <Route path="7" element={<Solution7/>}/>
            <Route path="8" element={<Solution8/>}/>
            <Route path="9" element={<Solution9/>}/>
            <Route path="10" element={<Solution10/>}/>
            <Route path="11" element={<Solution11/>}/>
            <Route path="12" element={<Solution12/>}/>
            <Route path="13" element={<Solution13/>}/>
            <Route path="14" element={<Solution14/>}/>
            <Route path="15" element={<Solution15/>}/>
            <Route path="16" element={<Solution16/>}/>
            <Route path="17" element={<Solution17/>}/>
            <Route path="18" element={<Solution18/>}/>
            <Route path="19" element={<Solution19/>}/>
            <Route path="20" element={<Solution20/>}/>
            <Route path="21" element={<Solution21/>}/>
            <Route path="22" element={<Solution22/>}/>
            <Route path="23" element={<Solution23/>}/>
            <Route path="24" element={<Solution24/>}/>
            <Route path="25" element={<Solution25/>}/>
        </Routes>
    );
}

export {Index, Solutions};