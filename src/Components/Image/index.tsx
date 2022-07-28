import BoundingBox from "../BoundingBox/BoundingBox";
import React, {Dispatch, SetStateAction} from "react";
import {FaceDetailList} from "aws-sdk/clients/rekognition";
const image : React.FC<{
    src:string,
    cli:string,
    width:number,
    height:number,
    FaceDetails:FaceDetailList,
    image:{height:number,width:number},
    setCurrent:Dispatch<SetStateAction<number>>,
    current:number
}> = (props)=>{
    let {FaceDetails, cli, current, height, image, setCurrent, src, width} = props;
    return(
        <>
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
        </>
    )
}
export default image;
