import axios from 'axios';
import React, {useState} from 'react';


export const useCommentHook = () => {
    const [comment, setComment] = useState('')

    const onComment = async(id, name, user_id, fetchPosts) => {
        try{
            const res = await
            axios({
              method: 'post',
              data: { 
                  user_id: user_id,
                  post_id: id,
                  commenter: name,
                  comment: comment
            },
              url: `http://localhost:8000/api/comments/`,
              headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
              },
            });
            console.log(res)
            setComment('')
            fetchPosts()
        }catch(e){
            console.log(e)
        }
    }

    const deleteComment = async(id, fetchPosts) => {
        try{
            const res = await
            axios({
              method: 'delete',
              url: `http://localhost:8000/api/comments/${id}`,
              headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
              },
            });
            fetchPosts()
            console.log(res)
        }catch(e){
            console.log(e)
        }
    }


  return {
      onComment,
      comment,
      setComment,
      deleteComment
  };
};
