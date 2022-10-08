import { PostComment } from "./post-comment";
import { CommentList } from "./comment-list";

export function TaskComment({ task, onRemoveComment, onAddComment }) {

    return (
        <section className="task-edit-container">
            <PostComment onAddComment={onAddComment} />
            <CommentList task={task} comments={task.comments} onRemoveComment={onRemoveComment} onAddComment={onAddComment} />
            {!task.comments.length && <div className="task-edit-no-comments">
                <div className="task-edit-no-comments-content">
                    <div className="img-container">
                        <img src="https://cdn.monday.com/images/pulse-page-empty-state.svg" alt="no-comments-img" />
                    </div>
                    <div className="text-container">
                        <h2 className="primary-text">No updates yet for this item</h2>
                        <p className="secondary-text">Be the first one to update about progress</p>
                    </div>
                </div>
            </div>}
        </section>
    )
}