import { connect } from "formik"
import { PersonCircle } from "../../person-circle";
import { BiTime } from 'react-icons/bi'
import { GoX } from 'react-icons/go';//delete or exit
import { LastUpdated } from "./last-updated";
import { DesignedTxt } from "./designed-txt.jsx";
import { PostUpdate } from "./post-comment";


export function CommentList({ comments, onRemoveComment, onAddComment }) {
    return <section className="item-updates-container">
        <PostUpdate onAddComment={onAddComment}/>
        {comments.map(((content, idx) => {
            return (
                <div className="user-update-card" key={content.byMember._id}>
                    <div className="user-details flex align-center">
                        <div className="user-img-name flex">
                            <img src={content.byMember.imgUrl} alt="user-img" />
                            <div className="username-name">
                                <h1>{content.byMember.fullname}</h1>
                            </div>

                                <div className="time flex align-center">
                                    <BiTime />
                                    <LastUpdated lastUpdated={content.createdAt} />
                                    <a className="delete-update-btn" onClick={(ev) => {
                                        ev.stopPropagation();
                                        onRemoveComment(idx);
                                    }}><GoX /></a>
                                </div>
                        </div>
                    </div>

                    <div className="user-text-area" //render html in html
                         dangerouslySetInnerHTML={{ __html: content.content.txt }}>
                    </div>
                    <div className="action-btns flex ">
                        <div className="like-post-wrapper ">
                            <div className="like-post btn">Like</div>
                        </div>
                        <div className="reply-post-wrapper ">
                            <div className="reply-post btn">Reply</div>
                        </div>
                    </div>

                </div>
            )

        }
        ))}







    </section>


}