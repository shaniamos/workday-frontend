import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useFormRegister } from "../hooks/useFormRegister.js"
import { addBoard } from "../store/actions/board.action.js"
import { GoX } from 'react-icons/go'

export const NewBoardMoadl = ({ toggleNewBoardModal }) => {

    const inputRef = useRef()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [register, setNewBoardTitle, newBoardTitle] = useFormRegister({
        title: ''
    })

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    const onSaveBoard = async () => {
        toggleNewBoardModal()
        try {
            const title = newBoardTitle.title
            let newBoard = { title }
            newBoard = await dispatch(addBoard(newBoard))
            navigate(`/board/${newBoard._id}`)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <section className="add-modal flex column">
            <div className="close-modal-btn" onClick={toggleNewBoardModal}>
                <span><GoX /></span>
            </div>
            <h1 className="create-board">Create board</h1>
            <label> Board name:
                <div className='input-container'>
                    <input className="create-board-input" ref={inputRef} {...register('title', 'text')} />
                    <div className="modal-btns" >
                        <button className="cancel-modal-btn" onClick={toggleNewBoardModal}>Cancel</button>
                        <button className="create-modal-btn" onClick={onSaveBoard}>Create Board</button>
                    </div>
                </div>
            </label>
        </section>
    )

}