export function PersonCircle({ persons }) {
    if (persons === undefined || persons.length === 0) {
        return (
            <div className="overlap-image">
                <img src="https://cdn.monday.com/icons/dapulse-person-column.svg" alt="" />
            </div>
        )
    }
    return (
        < div className="overlap-images-wrapper flex" >
            <div className="overlap-image first-person">
                <img src={`${persons[0].imgUrl}`} alt="" />
            </div>
            {(persons.length > 1) &&
                <div className="overlap-image second-person">
                    <img src={`${persons[1].imgUrl}`} alt="" />
                </div>}
            {(persons.length > 2) &&
                <div className="overlap-image-show-more">
                    <span className="show-more-count">{`+${persons.length - 2}`}</span>
                </div>}
        </div >
    )

}

