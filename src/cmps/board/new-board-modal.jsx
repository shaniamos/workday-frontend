import { useEffect, useRef } from "react"
import { useFormRegister } from "../../hooks/useFormRegister.js"

export const NewBoardMoadl = ({ toggleNewBoardModal, onSaveBoard }) => {

    const inputRef = useRef()
    const [register, setNewBoardTitle, newBoardTitle] = useFormRegister({
        title: '',
    })

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    return (
        <section className="new-board-modal-container open"> 
            <div className="main-screen" onClick={() => toggleNewBoardModal()}></div>
            <section className="add-modal flex column justify-center">
                <div className="close-modal-btn flex align-center" onClick={() => toggleNewBoardModal()}>
                    <span>X</span>
                </div>
                <h1 className="create-board">Create board</h1>
                <label> Board name:
                    <div className='input-container'>
                        <input className="create-board-input clean-input" ref={inputRef} {...register('title', 'text')} />
                        <div className="modal-btns" >
                            <button className="cancel-modal-btn" onClick={() => toggleNewBoardModal()}>Cancel</button>
                            <button className="create-modal-btn" onClick={() => onSaveBoard(newBoardTitle)}>Create Board</button>
                        </div>
                    </div>
                </label>
            </section>
        </section>
    )

}