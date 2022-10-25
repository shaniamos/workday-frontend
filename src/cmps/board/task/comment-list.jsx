
import { BiTime } from 'react-icons/bi'
import { LastUpdated } from "./last-updated";
import { AiOutlineLike } from 'react-icons/ai';//like
import { BsReply } from 'react-icons/bs';//reply
import { HiOutlineDotsHorizontal } from 'react-icons/hi';//dots

export function CommentList({ comments, onRemoveComment }) {

    return (
        <section className="item-comments-container">
            {comments.map(((content, idx) => {
                return (
                    <div className="user-comment-card" key={content.byMember.id}>
                        <div className="user-details flex align-center">
                            <div className="user-img-name flex">
                                <img src={content.byMember.imgUrl} alt="user-img" />
                                <div className="username-name">
                                    <h1>{content.byMember.fullname}</h1>
                                </div>

                                <div className="time flex align-center">
                                    <BiTime className='clock-icon' />
                                    <LastUpdated lastUpdated={content.createdAt} />
                                    <div className="dropdown">
                                        <a className="delete-comment-btn"><HiOutlineDotsHorizontal className='dots-comment-list' /></a>
                                        <div className="dropdown-content">
                                            <a onClick={() => onRemoveComment(idx)}>Delete comment</a>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="user-text-area" //render html in html
                            dangerouslySetInnerHTML={{ __html: content.content.txt }}>
                        </div>
                        <div className="action-btns flex ">
                            <div className="like-post-area ">
                                <div className="like-post btn"> <AiOutlineLike className='action-icon' />Like</div>

                            </div>
                            <div className="reply-post-area ">
                                <div className="reply-post btn"><BsReply className='action-icon' /> Reply</div>
                            </div>
                        </div>

                    </div>
                )
            }
            ))}
        </section>
    )
}

