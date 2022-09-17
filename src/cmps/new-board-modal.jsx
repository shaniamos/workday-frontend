import { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useFormRegister } from "../hooks/useFormRegister.js"
import { addBoard } from "../store/actions/board.action.js"

export const NewBoardMoadl = ({ toggleNewBoardModal }) => {

    const inputRef = useRef()
    const dispatch = useDispatch()
    const navigate = useNavigate()
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
        <section className="new-board-modal">
            <h1>Create board</h1>
            <label> Board name:
                <input ref={inputRef} {...register('title', 'text')} />
                <button onClick={onSaveBoard}>Create Board</button>
                <button onClick={toggleNewBoardModal}>Cancel</button>
            </label>
        </section>
    )
}