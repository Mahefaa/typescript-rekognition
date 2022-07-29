import React, {useState} from 'react';
import './App.css';
import {DetectFacesResponse} from "aws-sdk/clients/rekognition";
import Table from "./Components/Table";
//import {MockFaceDetails} from "./Components/MockData/Mock";
import Pagination from "./Components/Pagination";
import Image from "./Components/Image";
import './Components/login';
//import Loading from "./Components/Loading";
function App() {
  let [result,setResult]=useState<DetectFacesResponse>();
  const FaceDetails = result?.FaceDetails;
  //const OrientationCorrection = result?.OrientationCorrection;
  let [current,setCurrent] = useState<number>(0);
  let image = {height:300,width:300};
  return (
    <div className="App">
        <Image
          image={image}
          current={current}
          width={image.width}
          height={image.height}
          setResult={setResult}
          setCurrent={setCurrent}
          FaceDetails={FaceDetails}
        />
      <div className={"container"}>
        <Pagination
            minPage={0}
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
