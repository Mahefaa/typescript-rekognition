import React, {useState} from 'react';
import './App.css';
import {DetectFacesResponse} from "aws-sdk/clients/rekognition";
import './Components/Table';
import Table from "./Components/Table";
//import {MockFaceDetails} from "./Components/MockData/Mock";
import Pagination from "./Components/Pagination/Pagination";
import Image from "./Components/Image";
import './Components/login';
function App() {
  let [result,setResult]=useState<DetectFacesResponse>({} as DetectFacesResponse);
  const FaceDetails = result?.FaceDetails;
  //const OrientationCorrection = result?.OrientationCorrection;
  let [current,setCurrent] = useState<number>(0);
  let image = {height:680,width:680};
  return (
    <div className="App">
      <Image
          width={image.width}
          height={image.height}
          FaceDetails={FaceDetails}
          image={image}
          setCurrent={setCurrent}
          current={current}
          setResult={setResult}
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
