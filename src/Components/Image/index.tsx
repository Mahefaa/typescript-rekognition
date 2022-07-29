import BoundingBox from "../BoundingBox/BoundingBox";
import React, {Dispatch, SetStateAction, useState} from "react";
import {DetectFacesResponse, FaceDetailList} from "aws-sdk/clients/rekognition";
import './Image.modules.css';
import {AWSError} from "aws-sdk";
import DetectFaces from "../DetectFaces";
const Image : React.FC<{
    width:number,
    height:number,
    current:number,
    FaceDetails?:FaceDetailList,
    image:{
        height:number,
        width:number
    },
    setCurrent:Dispatch<SetStateAction<number>>,
    setResult:Dispatch<SetStateAction<DetectFacesResponse>>
}> = (props)=>{
    let {FaceDetails,current, height, image, setCurrent, width,setResult} = props;
    const [src,setSrc] = useState<string>("");
    const [alt,setAlt] = useState<string>("");
    const render:boolean = src.length > 0;
    return(
        <div>
            <input
                type={"file"}
                id={"image__input"}
                accept={"image/png, image/jpeg"}
                onChange={
                (event)=>processImage(event, (result)=> {
                        setAlt("detecting face . . .");
                        let file = event.target.files?.item(0);
                        DetectFaces(result,file as File,(err:AWSError, data:DetectFacesResponse)=> {
                            if (err) console.log(err, err.stack); // an error occurred
                            else {
                                setAlt("");
                                setSrc(URL.createObjectURL(file as File));
                                setResult(data);
                            }
                        });
                })}
                onClick={()=> {
                    setSrc("");
                    setResult({} as DetectFacesResponse)
                }}
            />
            <div className={`image ${render}`}>
                {render
                    &&
                    <img
                        src={src}
                        alt={alt}
                        width={width}
                        height={height}
                    />
                }
                {render && FaceDetails?.map((item, id) =>
                    <BoundingBox
                        left={item?.BoundingBox?.Left || 0}
                        top={item?.BoundingBox?.Top || 0}
                        width={item?.BoundingBox?.Width || 0}
                        height={item?.BoundingBox?.Height || 0}
                        image={image}
                        color={"transparent"}
                        id={id}
                        setCurrent={setCurrent}
                        current={current}
                    />)}
            </div>
        </div>
    )
}
//Load selected image and decode image bytes for Rekognition DetectFaces API
function processImage(event:any,callback:(arrayBuffer:ArrayBuffer)=>void) {
    new Response(event.target.files.item(0)).arrayBuffer().then(callback)
}
export default Image;
