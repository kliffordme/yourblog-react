import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { Card, Button } from 'react-bootstrap';
import { Pagination } from './Pagination';
import { usePostContext } from '../../contexts/post-context/PostContext';
import { onFollow } from '../hooks/follow-hook';

export const Users = ({user_id, fetchPosts}) => {
    const [users, setUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [follower, setFollower] = useState([])
    const [postsPerPage] = useState(3)
    const { postState, postDispatch } = usePostContext() 
    const {posts, post} = postState;
    const [loading, setLoading] = useState(false)


    useEffect(()=>{
        fetchUsers()
    }, [posts])
    
    const filtered = users.filter(user => {return user.id !== user_id})


    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filtered.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = (pageNumber) => {setCurrentPage(pageNumber)}

    const fetchUsers = async() => {
        const res = await axios({
            method: 'get',
            url: 'https://yourblog-api.herokuapp.com/api/users',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        })
        setUsers(res.data.users)
    }

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
    

    useEffect(()=> {
        fetchUsers()
        fetchFollowers()
    }, [])

  return <div className=' py-5 d-flex justify-content-center' >
      <div className='position-fixed'>
      <div className='py-3 m-3'>
          Users you may know: 
      </div>
      {currentPosts.length > 0 ? currentPosts.map((user) => (
          user.follower.filter(user => {return user.follower === user_id}).map(user => user.follower)[0] !== user_id ? 
          <Card key={user.id} id="black" className='mb-4 px-4 shadow-lg'>
              <Card.Body className=''>
                  <div className='d-flex'>
                      <div className=''>
                    {user.name}
                    </div>
                    <div>
                    <Button disabled={loading} onClick={()=>onFollow(user.id, null, null, user_id, fetchPosts, setLoading)} className='btn-sm border-0 p-0 mb-1 mx-2' variant="outline-secondary"> follow</Button>
                    </div>
                  </div>
                  <div className='py-2 m-auto'>
                  {user.email}
                  </div>
              </Card.Body>
          </Card>
      : null)): 'there are no current users'}
      <div>
        {filtered.length > 3 ? <Pagination postsPerPage={postsPerPage} totalPosts={filtered.length} paginate={paginate}/> : null}
        </div>
      </div>


  </div>;
};
