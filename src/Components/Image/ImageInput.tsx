import React, {Dispatch, SetStateAction} from "react";
import processImage from "../processImage";
import DetectFaces from "../DetectFaces";
import {AWSError} from "aws-sdk";
import {DetectFacesResponse} from "aws-sdk/clients/rekognition";
const ImageInput: React.FC<{
    setSrc: Dispatch<SetStateAction<string>>,
    setResult: Dispatch<SetStateAction<DetectFacesResponse|undefined>>
}>=(props)=>{

    const {setResult, setSrc} = props;

    let processAndDetect : (event:React.ChangeEvent<HTMLInputElement>)=>void = (event)=>{
        processImage(event, (result)=> {
            let file = event.target.files?.item(0);
            DetectFaces(result,file as File,(err:AWSError, data:DetectFacesResponse)=> {
                if (err) console.log(err, err.stack); // an error occurred
                else {
                    setSrc(URL.createObjectURL(file as File));
                    setResult(data);
                }
            });
        })
    }
    let resetClick : (event : React.MouseEvent<HTMLInputElement,MouseEvent>)=>void =()=>{
                setSrc("");
                setResult({} as DetectFacesResponse);
    }
    return (
        <input
            type={"file"}
            id={"image__input"}
            accept={"image/png, image/jpeg"}
            onChange={processAndDetect}
            onClick={resetClick}
        />
    )
}
export default ImageInput;