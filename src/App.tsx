import React, {useState} from 'react';
import './App.css';
import {DetectFacesResponse} from "aws-sdk/clients/rekognition";
import Table from "./Components/Table";
//import {MockFaceDetails} from "./Components/MockData/Mock";
import Pagination from "./Components/Pagination";
import Image from "./Components/Image";
import './Components/login';
import Home from "./Components/Home";
import logo from './logo.svg'
//import Loading from "./Components/Loading";
function App() {
  let [result,setResult]=useState<DetectFacesResponse>();
  let [src,setSrc]=useState<string>("");
  const FaceDetails = result?.FaceDetails;
  //const OrientationCorrection = result?.OrientationCorrection;
  let [current,setCurrent] = useState<number>(0);
  let image = {height:300,width:300};
  return (
    <div className="App">
        <Home setSrc={setSrc} setResult={setResult} logoSrc={logo}/>
        <Image
         src={src}
          image={image}
          current={current}
          width={image.width}
          height={image.height}
          setCurrent={setCurrent}
          FaceDetails={FaceDetails}
        />
      <div className={"container"}>
        <Pagination
            current={current}
            setCurrent={setCurrent}
            maxPage={FaceDetails?.length || 0}
        />
        <Table
            bold={true}
            id={current}
            className={"mainTable"}
            faceDetail={FaceDetails?.at(current)}
            key={`${FaceDetails?.at(current)?.BoundingBox?.Top}~${FaceDetails?.at(current)?.BoundingBox?.Width}`}
        />
      </div>
    </div>
  );
}
//enlever le mock en prod
export default App;
