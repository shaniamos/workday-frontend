import { Link, useParams } from "react-router-dom";

export function TaskEdit() {

    const params = useParams()

    return (
        <section className="task-edit">
            <h1>Hello TaskEdit</h1>
            <Link to={`/board/${params.boardId}`}>Back</Link>
        </section>
    )
}