import CSS from 'csstype';
import React, {Dispatch, SetStateAction} from "react";
import "./BoundingBox.modules.css";
const BoundingBox : React.FC<{
    left:number,
    top:number,
    width:number,
    height:number,
    image:{
        height:number,
        width:number
    },
    color:string,
    id:number,
    setCurrent:Dispatch<SetStateAction<number>>,
    current:number
}>=(props)=>{
    let {height, image, left, top, width,color,id,setCurrent,current} = props;
    let {height: imageHeight, width: imageWidth} = image;
    const style : CSS.Properties= {
        position:'absolute',
        top:`${(top * imageHeight).toPrecision(5)}px`,
        left: `${(left * imageWidth).toPrecision(5)}px`,
        border:`5px solid ${color}`,
        width:`${(width*imageWidth).toPrecision(5)}px`,
        height:`${(height * imageHeight).toPrecision(5)}px`

    }
    return(
        <div style={style}
             className={`box ${id} ${current===id?"current":""}`}
             onClick={()=>setCurrent(id)}>
            <span className={"bounding__id"}>Face : {id}</span>
        </div>
    )
}
export default BoundingBox;