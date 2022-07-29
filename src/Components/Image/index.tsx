import BoundingBox from "../BoundingBox/BoundingBox";
import React, {Dispatch, SetStateAction, useState} from "react";
import {DetectFacesResponse, FaceDetailList} from "aws-sdk/clients/rekognition";
import './Image.modules.css';
import {AWSError} from "aws-sdk";
import DetectFaces from "../DetectFaces";
import processImage from "../processImage";

/**
 * Displays input for file and image + image Data as Table when results are available
 * @param props : {
 *     width,height : image Size
 *     setResult : change table data at ../Table
 *     Please refer to ../BoundingBox for the rest
 * }
 */
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
    setResult:Dispatch<SetStateAction<DetectFacesResponse|undefined>>
}> = (props)=>{
    let {FaceDetails,current, height, image, setCurrent, width,setResult} = props;
    const [src,setSrc] = useState<string>("");
    const render:boolean = src.length > 0;
    return(
        <div className={"flex"}>
            <input
                type={"file"}
                id={"image__input"}
                accept={"image/png, image/jpeg"}
                onChange={
                (event)=>processImage(event, (result)=> {
                        let file = event.target.files?.item(0);
                        DetectFaces(result,file as File,(err:AWSError, data:DetectFacesResponse)=> {
                            if (err) console.log(err, err.stack); // an error occurred
                            else {
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
            <div className={`image ${render} flex`}>
                {render
                    &&
                    <img
                        src={src}
                        alt={"Faces"}
                        width={width}
                        height={height}
                    />
                }
                {render && FaceDetails?.map((item, id) =>
                    <BoundingBox
                        key={`${item.BoundingBox?.Left}~${item.BoundingBox?.Top}`}
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
export default Image;
