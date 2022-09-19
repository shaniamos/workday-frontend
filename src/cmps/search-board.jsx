import { useEffect,useState } from "react"


export const SearchBoard = ({onChangeFilter, contentSearch}) => {
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
             <div className="flex align-center">
                    
                    <input
                        className="board-search" autoComplete="off" type="text" name="txt" id="txt"
                        value={txt} placeholder="Enter here" onChange={handleChange}
                        autoFocus />
                </div>


        </form>

       
    )
}