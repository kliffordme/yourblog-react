import React,{useState} from 'react';
import {Modal, Button} from 'react-bootstrap'
import { useCommentHook } from '../hooks/comment-hook';

export const CommentModal = ({user, name, likes, post, comments, user_id, fetchPosts}) => {
  const [show, setShow] = useState(false)
  const closeModal = () => setShow(false)
  const data = comments.comment
  const {onComment, comment, setComment, deleteComment} = useCommentHook()
  // console.log(data.map((comment) => comment.comment))
  return <div>
    <Button onClick={()=>setShow(!show)} id="white" className='py-0 m-1' variant="outline-secondary">Comment</Button>

    <Modal show={show}
      onHide={closeModal}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className='bg-dark text-white border border-secondary'>
        <Modal.Title id="contained-modal-title-vcenter">
          {user.name}'s post
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='bg-dark text-white border-bottom-0 border-top-0 border border-secondary  px-0'>
        <div className='m-auto w-75 py-3'>
          <p className='my-3 py-3'>
           {post}
          </p>
          {likes ? <span>
            likes : {likes}
          </span> : ''}
          <div className="input-group mb-3 pt-2">
                      <input type="text" value={comment} onChange={(e)=>setComment(e.target.value)} className="form-control bg-dark text-white border-secondary my-1 p-1" placeholder="Write a comment..."/>
                      <button id="white" onClick={()=>onComment(comments.id, name, user_id, fetchPosts)} className="btn btn-outline-secondary my-1 py-1" style={{zIndex:0}} type="button">Post</button>
          </div>
          <div >
            {data.map((comment) => 
            <div key={comment.id} className='border-bottom border-secondary py-3 my-1 position-relative'>
              <span>{comment.commenter}: {comment.comment}</span>
              {comment.user_id === user_id ? 
                <button 
                onClick={()=>deleteComment(comment.id, fetchPosts)}
                type="button" 
                className="btn-close btn-close-white btn-sm p-0 mt-3 m-0 position-absolute top-0 end-0" 
                aria-label="Close">
                </button> : ''
                } 
              </div>)}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className='bg-dark border-top-0 border border-secondary'>
        <Button variant="outline-secondary" id="white" onClick={()=>setShow(!show)}>Close</Button>
      </Modal.Footer>
    </Modal>
  </div>;
};
