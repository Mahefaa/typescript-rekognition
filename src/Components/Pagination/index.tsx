import React, {Dispatch, SetStateAction} from "react";

/**
 * Paginates ../Table
 * @param props:{
 *     minPage: lowest page you can go to
 *     maxPage: highest page you can visit
 *     [current,setCurrent]  useState changing the displayed page
 * }
 * @constructor
 */
const Pagination : React.FC<{
    maxPage:number,
    setCurrent:Dispatch<SetStateAction<number>>,
    current:number
}>=(props)=>{
    let {maxPage,setCurrent, current} = props;
    return(
        <div className={"pagination"}>
            <input
                type="button"
                value="Previous"
                onClick={()=>setCurrent((prevState)=>prevState-1)}
                hidden={(current-1) < 0}
            />
            <input
                type="button"
                value="Next"
                onClick={()=>setCurrent(prevState => prevState+1)}
                hidden={(current+1) >= maxPage}
            />
        </div>
    )
}
export default Pagination;