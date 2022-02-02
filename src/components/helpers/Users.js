import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { Card, Button } from 'react-bootstrap';
import { Pagination } from './Pagination';

export const Users = ({user_id}) => {
    const [users, setUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(3)


    const filtered = users.filter(user => {return user.id !== user_id})


    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filtered.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = (pageNumber) => {setCurrentPage(pageNumber)}

    const fetchUsers = async() => {
        const res = await axios({
            method: 'get',
            url: 'http://localhost:8000/api/users',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        })
        setUsers(res.data.users)
    }

    useEffect(()=> {
        fetchUsers()
    }, [])

  return <div className=' py-5 d-flex justify-content-center' >
      <div className='position-fixed'>
      <div className='py-3'>
          Users you may know: 
      </div>
      {currentPosts.map((user) => (
          <Card key={user.id} className='bg-dark mb-3 text-white border-secondary'>
              <Card.Body className=''>
                  <div className='d-flex'>
                      <div className=''>
                    {user.name}
                    </div>
                    <div>
                    <Button className='btn-sm border-0 p-0 mb-1 mx-2' variant="outline-secondary"> follow</Button>
                    </div>
                  </div>
                  <div className='py-2 m-auto'>
                  {user.email}
                  </div>
              </Card.Body>
          </Card>
      ))}
      <div>
        {filtered.length > 0 ? <Pagination postsPerPage={postsPerPage} totalPosts={filtered.length} paginate={paginate}/> : null}
        </div>
      </div>


  </div>;
};
