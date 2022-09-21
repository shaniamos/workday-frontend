


export const AreYouSureModal = ({toggleNewBoardModal ,onRemoveTask}) => {




    return (
        <section className="are-you-sure-modal-container open">
            <div className="main-screen" ></div>
            <section className="delete-modal flex column justify-center">
                <h1 className="delete-item">Delete this Item?</h1>
                <div className="modal-btns" >
                    <button className="cancel-modal-btn" onClick={toggleNewBoardModal}>Cancel</button>
                    <button className="delete-modal-btn" onClick={onRemoveTask}>Delete</button>
                </div>
            </section>
        </section>
    )


}
