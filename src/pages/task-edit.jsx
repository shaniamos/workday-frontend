import { Link, useParams } from "react-router-dom";

export function TaskEdit() {

    const params = useParams()

    console.log(params)
    return (
        <section className="task-edit">
            <h1>Hello TaskEdit</h1>
            <Link to={`/board/${params.id}`}>Back</Link>
        </section>
    )
}