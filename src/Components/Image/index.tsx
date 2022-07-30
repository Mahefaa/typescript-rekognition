import BoundingBox from "../BoundingBox";
import React, {Dispatch, SetStateAction} from "react";
import {FaceDetailList} from "aws-sdk/clients/rekognition";
import './index.modules.css';
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
    src:string,
    FaceDetails?:FaceDetailList,
    image:{
        height:number,
        width:number
    },
    setCurrent:Dispatch<SetStateAction<number>>,
}> = (props)=>{
    const {FaceDetails, current, height, image, setCurrent, width,src} = props;
    const render:boolean = src.length > 0;
    return(
        <div className={`flex`}>
            {render &&
                <div className={"image"}>
                    {
                        <img
                            src={src}
                            alt={"Faces"}
                            width={width}
                            height={height}
                            id={"Faces"}
                        />
                    }
                    {FaceDetails?.map((item, id) =>
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
                        />
                    )}
                </div>
            }
        </div>
    )
}
export default Image;
