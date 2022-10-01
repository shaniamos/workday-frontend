
import { BiTime } from 'react-icons/bi'
import { LastUpdated } from "./last-updated";
import { PostUpdate } from "./post-comment";
import { GoX } from 'react-icons/go';//delete or exit
import { AiOutlineLike } from 'react-icons/ai';//like
import { BsReply } from 'react-icons/bs';//reply
import { HiOutlineDotsHorizontal } from 'react-icons/hi';//dots
import { useState } from 'react';


export function CommentList({ comments, onRemoveComment, onAddComment }) {
    const [isDotsclicked, setDotsClicked] = useState(false)

    const isMenuOpen = () => {
        setDotsClicked(!isDotsclicked)
    }


    return <section className="item-updates-container">
        <PostUpdate onAddComment={onAddComment} />
        {comments && <section>
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
                                    isMenuOpen();
                                }}><HiOutlineDotsHorizontal className='dots-comment-list'/></a>
                                {<div className='delete-commet-modal'>
                                        <a onClick={(ev) => {
                                            ev.stopPropagation();
                                            onRemoveComment(idx)
                                        }}> </a>

                                    </div>
                                    }
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
                            <div className="reply-post btn"><BsReply className='action-icon'/> Reply</div>
                        </div>
                    </div>

                </div>
            )

        }
        
        ))}</section>}







    </section>


}