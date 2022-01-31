import React, {useState} from 'react';
import axios from 'axios';
import { Pagination } from '../helpers/Pagination';
import { useCommentHook } from '../hooks/comment-hook';

export const Comments = ({post, name, user_id, fetchPosts}) => {
    const {onComment, comment, setComment, deleteComment} = useCommentHook()
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(3)
    const data = post.comment;

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = (pageNumber) => {setCurrentPage(pageNumber)}

    return <>
            <div>
                <div class="input-group my-3">
                    <input type="text" value={comment} onChange={(e)=>setComment(e.target.value)} class="form-control bg-dark text-white border-secondary my-1 p-1" placeholder="Write a comment..."/>
                    <button onClick={()=>onComment(post.id, name, user_id, fetchPosts)} class="btn btn-outline-secondary my-1 py-1" style={{zIndex:0}} type="button">Post</button>
                </div>
            </div>
                <div>
                    {currentPosts.map((comment)=> (
                    <div key={comment.id} className='p-3 m-1 position-relative border-bottom border-secondary'>
                        <span>{comment.commenter}: </span>
                        <span>{comment.comment}</span>
                        {comment.user_id === user_id ? 
                        <button 
                        onClick={()=>deleteComment(comment.id, fetchPosts)}
                        type="button" 
                        class="btn-close btn-close-white btn-sm p-0 mt-1 m-0 position-absolute top-0 end-0" 
                        aria-label="Close">
                        </button> : ''
                        }                               
                    </div>
                    ))}
                </div>
            {data.length > 3 ? <Pagination postsPerPage={postsPerPage} totalPosts={data.length} paginate={paginate}/> : ''}
        </>
    
}