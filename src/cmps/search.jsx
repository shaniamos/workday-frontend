import { useEffect,useState } from "react"
import { BsSearch } from 'react-icons/bs'  //Search


export const Search = ({onChangeFilter, contentSearch, sortOption}) => {
    const [txt, setInputTxt] = useState('')
    
    useEffect(() => {
        onChangeFilter({ txt }, contentSearch)
    }, [txt])

 
    const handleChange = async (ev) => {
        const value = ev.target.value
        setInputTxt(value)
    }

    return (
        <form className="search-board-form">
             <label htmlFor="txt" ></label>
             <div className="input-container flex align-center">
                 <BsSearch />
                    <input
                        className="board-search" autoComplete="off" type="text" name="txt" id="txt"
                        value={txt}  placeholder= " Search" onChange={handleChange}
                        autoFocus />            
                </div>
        </form>
    )
}
