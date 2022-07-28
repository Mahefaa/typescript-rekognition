import {Dispatch, SetStateAction} from "react";

const Pagination : React.FC<{
    minPage:number,
    maxPage:number,
    setCurrent:Dispatch<SetStateAction<number>>,
    current:number
}>=(props)=>{
    let {maxPage, minPage, setCurrent, current} = props;
    return(
        <>
            <input type="button" value="Previous" onClick={()=>setCurrent((prevState)=>prevState-1)} disabled={current-1<minPage}/>
            <input type="button" value="Next" onClick={()=>setCurrent(prevState => prevState+1)} disabled={current+1>=maxPage}/>
        </>
    )
}
export default Pagination;