import React, {useState} from 'react';
import './App.css';
import AWS from 'aws-sdk';
import {DetectFacesResponse, FaceDetail} from "aws-sdk/clients/rekognition";
import './Components/Table';
import Table from "./Components/Table";
import {MockFaceDetails} from "./Components/MockData/Mock";
import BoundingBox from "./Components/BoundingBox/BoundingBox";
import Pagination from "./Components/Pagination/Pagination";
function App() {
  AWS.config.region = process.env.REACT_APP_REGION; // Region
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: process.env.REACT_APP_POOL_ID as string
  });
  let [result,setResult]=useState<DetectFacesResponse>();
  const FaceDetails = result?.FaceDetails;
  const OrientationCorrection = result?.OrientationCorrection;
  let [src,setSrc] = useState<string>("");
  let [cli,setCli] = useState<string>("waiting for image ...");
  let [current,setCurrent] = useState<number>(0);
  let width:number = 550;
  let height:number = 550;
  let image = {height:height,width:width};
  //Load selected image and decode image bytes for Rekognition DetectFaces API
  function ProcessImage(event:any) {
    // Configure the credential provider to use your identity pool
    let file:any = event.target.files.item(0);
    new Response(file).arrayBuffer().then((result)=> {
      setCli("detecting face . . .");
      DetectFaces(result,file);
    })
  }
  function DetectFaces(imageData:ArrayBuffer,file:File) {
    let rekognition = new AWS.Rekognition();
    let params = {
      Image: {
        Bytes: imageData
      },
      Attributes: [
        'ALL',
      ]
    };
    rekognition.detectFaces(params, function (err:any, data:DetectFacesResponse) {
      if (err) console.log(err, err.stack); // an error occurred
      else {
        setCli("");
        setSrc(URL.createObjectURL(file));
        setResult(data);
      }
    });
  }
  return (
    <div className="App">

      <div className={"image"}>
        <input type={"file"} accept={"image/png, image/jpeg"} onChange={ProcessImage} onClick={()=>{
          setSrc("");
          setResult({} as DetectFacesResponse)
        }}/>
        <img src={src} alt={cli} width={width} height={height}/>
        {src.length && FaceDetails?.map((item,id)=>
            <BoundingBox
              left={item?.BoundingBox?.Left || 0}
              top={item?.BoundingBox?.Top || 0}
              width={item?.BoundingBox?.Width || 0}
              height={item?.BoundingBox?.Height || 0}
              image={image}
              color={"red"}
              id={id}
              setCurrent={setCurrent}
              current={current}
            />)}
      </div>
      <div className={"container"}>
        {src &&
        <>
            <Pagination minPage={0} maxPage={FaceDetails?.length || 0} setCurrent={setCurrent} current={current}/>

            <Table
                key={`${FaceDetails?.at(current)?.AgeRange}~${FaceDetails?.at(current)?.BoundingBox}`}
                id={current}
                list={(FaceDetails?.at(current) || MockFaceDetails.at(0)) as FaceDetail}
                className={"mainTable"} bold={true}/>
        </>
        }
      </div>
    </div>
  );
}
//enlever le mock en prod
export default App;
