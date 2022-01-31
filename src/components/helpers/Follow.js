import React,{useState, useEffect} from 'react';
import axios from 'axios';

export const Follow = ({post, user_id, fetchPosts}) => {

    const [loading, setLoading] = useState(false)

    const onFollow = async(id) => {
        setLoading(true)
        try{
            const res = await
            axios({
              method: follower ? 'delete' : 'post',
              url: follower ? `http://localhost:8000/api/followers/${filtered}` : `http://localhost:8000/api/followers`,
              data: follower ? null : {
                  user_id: id,
                  follower: user_id,
              },
              headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
              },
            });
            fetchPosts()
            console.log(res)
        }catch(e) {
            console.log(e)
        }   

        setLoading(false)
    }

    const follower = post.follow.map(follow => follow.follower).filter(follow => {return follow === user_id})[0];
    const filtered = post.follow.filter(follow => {return follow.follower === user_id}).map(follow => follow.id)[0];

  return <div>
        <h6>
            {post.user.name}
            {post.user.id !== user_id ? <button disabled={loading} style={{cursor: 'pointer'}} onClick={()=>onFollow(post.user_id)} class="mx-1 btn btn-outline-secondary btn-sm border-0 p-1">{post.user.id !== user_id && follower !== user_id  ? 'follow' : 'followed'}</button> : ''}
        </h6>
  </div>;
};
