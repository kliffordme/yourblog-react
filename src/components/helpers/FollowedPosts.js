import React,{useState, useEffect} from 'react';
import { LikeCommentButton } from './LikeCommentButton';
import {Card, Dropdown,} from 'react-bootstrap'
import { Comments } from './Comments';
import { usePostContext } from '../../contexts/post-context/PostContext';
import { Follow } from './Follow';
import axios from 'axios';

export const FollowedPosts = ({name, user_id, fetchPosts, onDelete, editPost}) => {
    const { postState, postDispatch } = usePostContext() 
    const { posts, post } = postState;
    const [follower, setFollower] = useState([])

    useEffect(()=>{
        fetchFollowers()
    }, [])

    const hasFollowing = follower.filter(follow => {return follow.follower === user_id}).map(follow => follow.follower)[0]

    const fetchFollowers = async() => {
        const res = await axios({
            method: 'get',
            url: 'https://yourblog-api.herokuapp.com/api/followers',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        })

        setFollower(res.data)
    }

  return <div>
      {hasFollowing ? posts.map((post)=>(
          post.follow.filter((follow) => {return follow.follower === user_id}).map(follow => follow.follower)[0] === user_id ? 
          <Card key={post.id} id="black" className='shadow-lg p-4 w-75 m-auto position-relative my-3 '>
                        <Follow post={post} user_id={user_id} fetchPosts={fetchPosts} />
                        <div className='p-3 rounded m-2'>
                        {post.post}
                        </div>
                    {post.like.length > 0 ? <div>
                            likes: {post.like.length}
                        </div>: null}
                        <div>
                            <LikeCommentButton 
                            post={post} 
                            user_id={user_id} 
                            name={name}
                            fetchPosts={fetchPosts}
                            />
                        </div>
                        <div>
                            <Comments 
                            post={post} 
                            name={name}
                            user_id={user_id}
                            fetchPosts={fetchPosts}
                            />
                        </div>
                        {post.user_id === user_id ? 
                        <Dropdown className='pt-2 position-absolute top-0 end-0 text-white'>
                            <Dropdown.Toggle variant="muted text-white" id="dropdown-basic"/>
                            <Dropdown.Menu variant='dark'>
                                <Dropdown.Item onClick={()=>editPost(post.id)}>Edit Post</Dropdown.Item>
                                <Dropdown.Item onClick={()=>onDelete(post.id)} >Delete</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        : null}
                    </Card> : '')) : <div className='m-auto mt-5 w-50'>Posts from people you followed should appear here.</div>}
  </div>;
};
