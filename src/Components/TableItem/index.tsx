import React from "react";
import Table, {VerticalTable} from "../Table";
import {Emotions, FaceDetail, Landmarks} from "aws-sdk/clients/rekognition";

/**
 * Item rendered in every use of ../Table
 * @param props:{
 *     title : item title
 *     body: item body,
 *     bold: states if text should be bold
 * }
 * @constructor
 */
const TableItem : React.FC<{title?:string, body:any,bold:boolean}> = (props)=>{
    let {body, title,bold} = props;
    return(
        <tr>
            {!bold ? <td className={"title"}>{title}</td> : <th>{title}</th>}
            <td>{renderData(body)}</td>
        </tr>
    );
}

/**
 * Renders TableItem 's body as a new Table or as sentences
 * @param data
 */
function renderData(data:Emotions|Landmarks|FaceDetail|number|string|boolean){
    if(data instanceof Array){
        return (
            <div className={"container"}>
                <VerticalTable data={data} className={"verticalTable"}/>
            </div>
        );
    }
    else if(typeof data !== "object"){
        return data.toString();
    }
    else{
        return (<Table faceDetail={data} className={"sideTable"}/>);
    }
}

export default TableItem;