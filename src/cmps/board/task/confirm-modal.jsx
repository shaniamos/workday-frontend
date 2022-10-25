
export const ConfirmModal = ({ toggleNewBoardModal, onRemoveEntity }) => {
    const onCloseModal = () => {
        toggleNewBoardModal()
    }
    return (
            <section className="are-you-sure-modal-container open">
                <div className="main-screen" onClick={onCloseModal}></div>
                <section className="delete-modal flex column justify-center space-between">
                    <h1 className="delete-item">Delete this Item?</h1>
                    <div className="modal-btns" >
                        <button className="delete-modal-btn" onClick={onRemoveEntity}>Delete</button>
                        <button className="cancel-modal-btn" onClick={toggleNewBoardModal}>Cancel</button>
                    </div>
                </section>
            </section>
        

    )


}
