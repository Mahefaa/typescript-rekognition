import React, {Dispatch, SetStateAction, useState} from "react";
import processImage from "../processImage";
import DetectFaces from "../DetectFaces";
import {AWSError} from "aws-sdk";
import {DetectFacesResponse} from "aws-sdk/clients/rekognition";
import './index.modules.css'
const Home: React.FC<{
    setSrc: Dispatch<SetStateAction<string>>,
    setResult: Dispatch<SetStateAction<DetectFacesResponse|undefined>>,
    logoSrc:string
}>=(props)=>{
    const {setResult, setSrc,logoSrc} = props;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [title,setTitle] = useState<string>("Load Picture for Face Analysis");
    const [hasLoaded,setHasLoaded] = useState<boolean>(false);
    let logoStyle = {
        width:hasLoaded?"30px":"100px",
        height:hasLoaded?"30px":"100px"
    }
    let loadingStyle = {
        animation:"loading infinite linear 2500ms",
        width:hasLoaded?"30px":"100px",
        height:hasLoaded?"30px":"100px"
    }
    let processAndDetect : (event:React.ChangeEvent<HTMLInputElement>)=>void = (event)=>{
        setIsLoading(true);
        processImage(event, (result)=> {
            let file = event.target.files?.item(0);
            setTitle(`calling rekognition on ${file?.name}`)
            DetectFaces(result,file as File,(err:AWSError, data:DetectFacesResponse)=> {
                if (err) {
                    alert("Network error");
                    console.log(err,err.stack);
                    window.location.reload();
                } // an error occurred
                else {
                    setTitle("Analysis results delivered. Click to reset");
                    setIsLoading(false);
                    setHasLoaded(true);
                    setSrc(URL.createObjectURL(file as File));
                    setResult(data);
                }
            });
        })
    }
    let resetClick : (event : React.MouseEvent<HTMLInputElement,MouseEvent>)=>void =()=>{
                setSrc("");
                setResult(undefined);
                setTitle("Load Picture for Face Analysis");
                setHasLoaded(false);
    }
    return (
        <div className={"home"}>
            <span id={`logo_container`} className={`${hasLoaded}`}>
            <label htmlFor={"app__image__input"} hidden={isLoading} className={hasLoaded?"flex":""}>
                <img src={logoSrc} alt={"logo"} id={"logo_image"} style={logoStyle}/>
                {!isLoading && <p id={"logo_text"}>{title}</p>}
            </label>
                {isLoading &&
                    <>
                        <img src={logoSrc} alt={"logo"} id={"logo_image"} style={loadingStyle}/>
                        <p id={"loading_text"}>{title}</p>
                        <input
                            id={"cancel"}
                            type={"button"}
                            value={"Cancel"}
                            onClick={()=>{
                                setTitle("Load Picture for Face Analysis");
                                window.location.reload();
                            }}
                        />
                    </>
                }
            </span>
                <input
                    hidden={true}
                    type={"file"}
                    onClick={resetClick}
                    id={"app__image__input"}
                    onChange={processAndDetect}
                    accept={"image/png, image/jpeg"}
                />
        </div>
    )
}

export default Home;