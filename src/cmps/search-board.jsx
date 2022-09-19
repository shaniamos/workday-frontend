import { useEffect,useState } from "react"
import { useFormRegister } from "../hooks/useFormRegister"
import { TextInput } from "./text-input"


export const SearchBoard = ({onChangeFilter, contentSearch}) => {
    const [, register] = useFormRegister({

        txt: '',
        sortBy: ''
    },onChangeFilter )
    
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
             <section>
                <TextInput register={register} label="Search by name" name="name"/>
            </section>
                    
                    {/* <input
                        className="board-search" autoComplete="off" type="text" name="txt" id="txt"
                        value={txt} placeholder="Enter here" onChange={handleChange}
                        autoFocus /> */}
                </div>


        </form>

       
    )
}