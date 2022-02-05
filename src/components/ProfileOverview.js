import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const ProfileOverview = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        created: ''
    })

    console.log(user)

    const fetchUser = async() => {
        try{
            const res = await axios({
                    method: 'get',
                    url: 'https://yourblog-api.herokuapp.com/api/users/view-profile',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                  });
                  console.log(res)
                  setUser({
                      name: res.data.user.name,
                      email: res.data.user.email,
                      created: res.data.user.created_at,
                  })
        }catch(e){

        }
    }

    useEffect(()=>{
        fetchUser()
    }, [])

  return <Card className='vh-100 bg-dark text-white'>
      <div className='my-5 w-50 mx-auto border-secondary border'>
      <Card.Header className="border-bottom border-secondary d-flex justify-content-between">
        <div>Profile</div>
        <Button className='btn-sm' variant='outline-secondary'><Link to="/" id='nav-btn'>Dashboard</Link>
</Button>
      </Card.Header>
      <Card.Body className="p-5">
          <div className='mb-2'>
          User: {user.name}
          </div>
          <div className='mb-2'>
          Email: {user.email}
          </div>
          <div className='mb-2'>
          Created: {user.created}
          </div>

      </Card.Body>

      </div>
  </Card>;
};
