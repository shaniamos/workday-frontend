import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useFormRegister } from "../hooks/useFormRegister.js"
import { addBoard } from "../store/actions/board.action.js"

export const NewBoardMoadl = ({ toggleNewBoardModal }) => {

    const inputRef = useRef()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isFocusTxt, setFocusTxt] = useState(false)
    const [register, setNewBoardTitle, newBoardTitle] = useFormRegister({
        title: 'New Board'
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
        <section className="add-modal flex column justify-center align-center">
            <div className="close-modal-btn flex align-center" onClick={toggleNewBoardModal}>
                <span>X</span>
            </div>
            <h1 className="create-board">Create board</h1>
            <label> Board name:
                <div className='input-container'>
                    <input className="create-board-input clean-input" ref={inputRef} {...register('title', 'text')} />
                    <div className="modal-btns" >
                        <button className="cancel-modal-btn" onClick={toggleNewBoardModal}>Cancel</button>
                        <button className="create-modal-btn" onClick={onSaveBoard}>Create Board</button>
                    </div>
                </div>
            </label>
        </section>
    )

}