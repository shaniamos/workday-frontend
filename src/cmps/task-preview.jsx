export const TaskPreview = ({ task }) => {

    const { title, persons, status, priority, deadLine, lastUpdate } = task
    return (
        <section className="task-preview">
            <td>{title}</td>
            {/* <td>{persons}</td> */}
            <td>{status}</td>
            <td>{priority}</td>
            <td>{deadLine}</td>
            <td>{lastUpdate}</td>
        </section>
    )
}