import React,{useState} from 'react';
import axios from 'axios';
import { CommentModal } from '../modals/CommentModal';

export const LikeCommentButton = ({post, user_id, name, fetchPosts}) => {  
    
    const [loading, setLoading] = useState(false)

    const onLike = async(id) => {
        console.log(user_id)
        setLoading(true)
        try{
            const res = await
            axios({
              method: 'post',
              url: 'https://yourblog-api.herokuapp.com/api/likes',
              data: {
                  post_id: id,
                  user_id: user_id,
              },
              headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
              },
            });
            console.log(res)
            fetchPosts()

        }catch(e){
            console.log(e.response)

        }
        setLoading(false)

    }

    const deleteLike = async(id, like_id, userId) => {
        setLoading(true)
        if(userId !== true){
            return console.log('error')
        }

        try{
            const res = await
            axios({
              method: 'delete',
              data: { 
                  user_id: user_id,
                  post_id: id
            },
              url: `https://yourblog-api.herokuapp.com/api/likes/${like_id[0]}`,
              headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
              },
            });
            fetchPosts()

        }catch(e){
            console.log(e)

        }
        setLoading(false)
    }


  return <div>
            <div className='d-flex'>
                <button 
                className={`btn btn-outline-secondary m-1 px-4 py-0 ${post.like.map((like)=>like.user_id).filter((like)=>{return like === user_id})[0] === user_id ? 'bg-secondary text-white': null}`} 
                type="button" 
                id="white"
                onClick={post.like.map((like)=>like.user_id).filter((like)=>{return like === user_id})[0] === user_id ? 
                ()=>deleteLike(post.id, 
                post.like.map((e)=> e.id), 
                post.like.map((e)=> e.user_id).filter((like)=>{return like === user_id})[0] === user_id ? true : false) : 
                ()=>onLike(post.id)}
                disabled={loading}
                >Like</button> 
                <CommentModal fetchPosts={fetchPosts} name={name} user={post.user} likes={post.like.length} post={post.post} comments={post} user_id={user_id}/>
            </div>
  </div>;
};

