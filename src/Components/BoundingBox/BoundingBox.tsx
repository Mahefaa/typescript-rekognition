import CSS from 'csstype';
import React, {Dispatch, SetStateAction} from "react";
import "./BoundingBox.modules.css";

/**
 * Bounding box that appears following the location infos given as props
 * @param props : {
 *     left,top,width,height : box location,
 *     image : image size,
 *     color : box border color,
 *     id : box id if there are multiple boxes,
 *     [current ,setCurrent ] useState hook to change currently displayed box's id
 * }
 */
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
             className={`box ${current===id?"current":""} ${id}`}
             onClick={()=>setCurrent(id)}>
            <span className={"bounding__id"}>Face : {id}</span>
        </div>
    )
}
export default BoundingBox;