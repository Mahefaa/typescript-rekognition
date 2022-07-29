import React from "react";
import './index.modules.css'
import './logo.svg'
const Loading : React.FC<{
    text:string,
    isLoading:boolean
}> = (props)=>{
    const {text,isLoading} = props;
return (
    <>
        {isLoading &&
            <div id={"Loading"}>
                <span id={"Loading__text"}>
                    <p>{text}</p>
                    <button onClick={(event)=>{
                        window.location.reload();
                    }}>
                        Cancel
                    </button>
                </span>
            </div>
        }
    </>
)
}
export default Loading;