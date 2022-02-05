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
        url: 'https://yourblog-api.herokuapp.com/api/users/register',
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
        <Card className='vh-100 bg-dark'>
            <div className='bg-dark text-white border-secondary m-auto position-relative border rounded p-5'>
                <Card.Header>
                    <h4>Register to YourBlog</h4>
                </Card.Header>
                <Card.Body className='border-top border-secondary'>
                    <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control  className='bg-dark border-secondary text-white' required type="email" placeholder="Enter email" onChange={(e)=>formHandler('email', e.target.value)} />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Name</Form.Label>
                        <Form.Control className='bg-dark border-secondary text-white' required type="name" placeholder="Name" onChange={(e)=>formHandler('name', e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control className='bg-dark border-secondary text-white' required type="password" placeholder="Password" onChange={(e)=>formHandler('password', e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control className='bg-dark border-secondary text-white' required type="password" placeholder="Password" onChange={(e)=>formHandler('rptPassword', e.target.value)} />
                    </Form.Group>
                    <div className='d-flex justify-content-between pt-3'>
                    <Button variant="outline-secondary text-white" className='mt-1' type="submit">
                        Submit
                    </Button>
                    <span className='mt-2'>
                        <Link to='/login' className='text-white'>Log-in</Link>
                    </span>
                    </div>
                    </Form>
                </Card.Body>

            </div>
        </Card>        </div>
    )
}

export default SignUp
