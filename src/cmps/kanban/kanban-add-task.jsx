import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { useFormRegister } from "../../hooks/useFormRegister"
import { utilService } from "../../services/util.service"
import { addTask } from "../../store/actions/board.action"

export const KanbanAddTask = ({groupId, boardId}) => {
  const dispatch = useDispatch()
    const params = useParams()
    let [register, setTask, task] = useFormRegister({
        title: ''
    })

    const onAddTask = (event) => {
      event.preventDefault()
      const boardId = params.id
      task = createTask(task)
      dispatch(addTask(boardId, groupId, task))
      setTask({ title: '' })
  }

  const createTask = (task) => {
      task.id = utilService.makeId()
      task.status = ''
      task.priority = ''
      task.persons = []
      task.deadLine = ''
      task.lastUpdate = ''
      task.comments = []
      task.timeline = [Date.now(), Date.now()]
      task.comments = []
      return task
  }

  return (
    <div className="kanban-new-task">
      <div className="editable-heading task-name-heading">
        <form className="clean-input" onSubmit={onAddTask}>
          <input {...register('title', 'text')} className="clean-input" placeholder="+ Add Item" />
        </form>
      </div>
    </div>
  )
}
