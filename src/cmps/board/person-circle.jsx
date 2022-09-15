export function PersonCircle() {

    return (
        <div className="overlap-images-wrapper flex">
            <div className="overlap-image first-person">
                <img src="https://files.monday.com/use1/photos/33955425/thumb_small/33955425-user_photo_2022_09_02_13_45_46.png?1662126346" alt="" />
            </div>
            <div className="overlap-image second-person">
                <img src="https://files.monday.com/use1/photos/15682769/thumb_small/15682769-user_photo_2022_08_13_17_52_21.png?1660413142" alt="" />
            </div>
            <div className="overlap-image-show-more">
                <span className="show-more-count">+2</span>
            </div>
        </div>
    )
}