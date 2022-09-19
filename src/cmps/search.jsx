// import { useEffect,useState } from "react"
import { useFormRegister } from "../hooks/useFormRegister.js"
// import { TextInput } from "./text-input"


export const SearchBoard = ({ onChangeFilter, contentSearch }) => {
    // const [, register] = useFormRegister({
    //     txt: '',
    //     sortBy: '',
    // }, onChangeFilter)

    // useEffect(() => {
    //     onChangeFilter({ txt }, contentSearch)
    // }, [txt])

    // const handleChange = async (ev) => {
    //     const value = ev.target.value
    //     setInputTxt(value)
    // }

    return (
        <form className="search-board-form">
            <label htmlFor="txt" ></label>
            <div className="flex align-center">
                {/* <input className="board-search"
                    id="txt"
                    name="txt"
                    type="text"
                    value={txt}
                    placeholder="Enter here"
                    autoComplete="off"
                    onChange={handleChange}
                    autoFocus /> */}
            </div>
        </form>
    )
}