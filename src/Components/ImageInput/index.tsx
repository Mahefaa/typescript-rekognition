import React, {Dispatch, SetStateAction, useState} from "react";
import processImage from "../processImage";
import DetectFaces from "../DetectFaces";
import {AWSError} from "aws-sdk";
import {DetectFacesResponse} from "aws-sdk/clients/rekognition";
import Loading from "../Loading";
import './index.modules.css'
const ImageInput: React.FC<{
    setSrc: Dispatch<SetStateAction<string>>,
    setResult: Dispatch<SetStateAction<DetectFacesResponse|undefined>>,
}>=(props)=>{

    const {setResult, setSrc} = props;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [title,setTitle] = useState<string>("Load Picture for Face Analysis")
    let processAndDetect : (event:React.ChangeEvent<HTMLInputElement>)=>void = (event)=>{
        setIsLoading(true);
        processImage(event, (result)=> {
            let file = event.target.files?.item(0);
            DetectFaces(result,file as File,(err:AWSError, data:DetectFacesResponse)=> {
                if (err) {
                    alert("Network error");
                    console.log(err,err.stack);
                    window.location.reload();
                } // an error occurred
                else {
                    setTitle("Analysis results delivered. Click to reset")
                    setIsLoading(false);
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
        <>
            <span id={"app__top"}>
            <label htmlFor={"app__image__input"}>{title}</label>
                <input
                    type={"file"}
                    id={"app__image__input"}
                    accept={"image/png, image/jpeg"}
                    onChange={processAndDetect}
                    onClick={resetClick}
                />
            </span>
            <Loading
                text={"Analyzing Face(s)"}
                isLoading={isLoading}
            />
        </>
    )
}
export default ImageInput;