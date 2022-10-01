import { useEffect, useState } from "react"
import { BsSearch } from 'react-icons/bs'  //Search


export const Search = ({ onChangeFilter }) => {
    const [txt, setInputTxt] = useState('')

    useEffect(() => {
        onChangeFilter({ txt })
    }, [txt])


    const handleChange = async (ev) => {
        const value = ev.target.value
        setInputTxt(value)
        onChangeFilter({ txt })
    }

    return (
        <form className="search-board-form flex align-center">
            <BsSearch className="search-icon" />
            <input className="board-search-input"
                autoComplete="off"
                type="text"
                name="txt"
                id="txt"
                value={txt}
                placeholder=" Search"
                onChange={handleChange}
            />
        </form>
    )
}
