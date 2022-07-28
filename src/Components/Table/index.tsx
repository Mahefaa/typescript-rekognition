import React from "react";
import {FaceDetail} from "aws-sdk/clients/rekognition";
import './table.modules.css'
import TableItem from "../TableItem";
const Table : React.FC<{faceDetail?:FaceDetail,className?:string,bold?:boolean,id?:number}> = (props)=>{
    const {faceDetail,className,bold,id} = props;
    const titles = Object.keys(faceDetail||{});
    return(
    <>
        {
            titles.length>0 &&
            <>
                <h3>{id !== undefined ? `Face : ${id}` : ""}</h3>
                <table className={className}>
                    <tbody>
                        {Object.values(faceDetail || {}).map((detail, index) => (
                        <TableItem
                            key={`${titles[index]}~${detail}`}
                            title={titles[index]}
                            body={detail}
                            bold={bold || false}
                        />
                        ))}
                    </tbody>
                </table>
            </>
        }
    </>
    )
}
export const VerticalTable:React.FC<{data:{}[],className?:string}> = (props)=>{
    let {data,className} = props;
    return(
        <table className={className}>
            <thead>
            <tr>
                {
                    Object.keys(data[0]).map((title)=>(
                        <td key={title}>{title}</td>
                    ))
                }
            </tr>
            </thead>
            <tbody>
            {data.map((item) => (
                <tr key={item.toString()}>
                    {Object.values(item).map((value)=>(
                        <td key={value as string}>{value as string}</td>
                    ))
                    }
                </tr>
            ))}
            </tbody>
        </table>
    )
}
export default Table;