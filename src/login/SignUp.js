import React,{useState} from 'react'
import {Form, Button, Card} from 'react-bootstrap'
import { axiosV1 } from '../utils'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


const SignUp = () => {
const navigate = useNavigate()
const [formData, setFormData] = useState({
    email : '',
    name : '',
    password: '',
    rptPassword: ''
})

const formHandler = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

const onSubmit = async(e) => {
    e.preventDefault()
    if(formData.password !== formData.rptPassword){
        return console.log('passwords do not match');
    }
    const data = await axios({
        method: 'post',
        url: 'http://localhost:8000/api/users/register',
        data: {
            email: formData.email,
            name: formData.name,
            password: formData.password
        }
      });
    console.log(data)
      navigate('/login')
}

    return (
        <div>
        <Card className='vh-100'>
            <div className='mw-25 m-auto position-relative border rounded'>
                <Card.Header>
                    Register to Blog App
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(e)=>formHandler('email', e.target.value)} />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="name" placeholder="Name" onChange={(e)=>formHandler('name', e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e)=>formHandler('password', e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e)=>formHandler('rptPassword', e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    <span className='position-absolute end-0 m-3'>
                        <Link to='/login'>Log-in</Link>
                    </span>
                    </Form>
                </Card.Body>

            </div>
        </Card>        </div>
    )
}

export default SignUp
