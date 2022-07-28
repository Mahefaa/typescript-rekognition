import React from "react";
import Table, {VerticalTable} from "../Table";
const TableItem : React.FC<{title?:string, body:any,bold:boolean}> = (props)=>{
    let {body, title,bold} = props;
    return(
        <tr>
            {!bold ? <td className={"title"}>{title}</td> : <th>{title}</th>}
            <td>{renderData(body)}</td>
        </tr>
    );
}

function renderData(data:[{}]|{}){
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