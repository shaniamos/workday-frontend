import { useSelector } from "react-redux"
import { CommentList } from "./comment-list";


export function TaskComment({ task, onRemoveComment }) {
    // const { board } = useSelector(state => state.boardModule)

    // console.log('task', task);

    if(!task.comments) return <div>No tasks</div>  
    return ( 
        
        <section className="edit-task-bottom-container">
            {task.comments && (
                <CommentList task={task} comments={task.comments} onRemoveComment={onRemoveComment} />
            ) 
            }

        </section>

    )




}