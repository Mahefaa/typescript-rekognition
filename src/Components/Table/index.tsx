import React from "react";
import {FaceDetail} from "aws-sdk/clients/rekognition";
import PicDetail from "../PictureDetail";'../PictureDetail/index';

const Picture : React.FC<{faceDetail:FaceDetail}> = (props)=>{
    const {faceDetail} = props;
    const title = Object.keys(faceDetail);
    title.map(()=>(

    ))
}
export default Picture;