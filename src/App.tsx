import React, {useState} from 'react';
import './App.css';
import AWS from 'aws-sdk';
import {DetectFacesResponse} from "aws-sdk/clients/rekognition";
import './Components/Table';
import Table from "./Components/Table";
//import {MockFaceDetails} from "./Components/MockData/Mock";
import Pagination from "./Components/Pagination/Pagination";
import Image from "./Components/Image";
function App() {
  AWS.config.region = process.env.REACT_APP_REGION; // Region
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: process.env.REACT_APP_POOL_ID as string
  });
  let [result,setResult]=useState<DetectFacesResponse>({} as DetectFacesResponse);
  const FaceDetails = result?.FaceDetails;
  //const OrientationCorrection = result?.OrientationCorrection;
  let [current,setCurrent] = useState<number>(0);
  let width:number = 550;
  let height:number = 550;
  let image = {height:height,width:width};
  return (
    <div className="App">
      <Image
          width={width}
          height={height}
          FaceDetails={FaceDetails}
          image={image}
          setCurrent={setCurrent}
          current={current}
          setResult={setResult}
      />

      <div className={"container"}>

        {result !== {} as DetectFacesResponse &&
        <>
            <Pagination
                minPage={0}
                current={current}
                setCurrent={setCurrent}
                maxPage={FaceDetails?.length || 0}
            />
            <Table
                id={current}
                className={"mainTable"} bold={true}
                key={`${FaceDetails?.at(current)?.AgeRange}~${FaceDetails?.at(current)?.BoundingBox}`}
                faceDetail={FaceDetails?.at(current)}
            />
        </>
        }
      </div>
    </div>
  );
}
//enlever le mock en prod
export default App;
