import React,{useState, useEffect} from 'react'
import {Form, Button, Card, Nav} from 'react-bootstrap'
import axios from 'axios'
import {Link, Navigate} from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'
import { ClipLoader } from 'react-spinners'


const Login = () => {
    const {login, errorMsg} = useAuthContext()
    const [formData, setFormData] = useState({
        email : '',
        password: '',
    })
    const [loading, setLoading] = useState(false)

    const formHandler = (key, value) => {
        setFormData({
          ...formData,
          [key]: value,
        });
      };

    const onSubmit = async(e) => {
        e.preventDefault()
        setLoading(true)
        try{
            const data = await login(formData.email, formData.password)
            setLoading(false)

        }catch(e){
            console.log(e)
        }
        setLoading(false)

    }


    return (
        <Card className='vh-100 bg-dark text-white'>
            <div className='p-5 m-auto border border-secondary rounded position-relative'>
                <Card.Header>
                    <h4>YourBlog</h4>
                </Card.Header>
                <Card.Body className='border-top border-secondary'>
                    <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" className='bg-dark border-secondary text-white' placeholder="Enter email" onChange={(e)=>formHandler('email', e.target.value)} />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" className='bg-dark border-secondary text-white' placeholder="Password" onChange={(e)=>formHandler('password', e.target.value)} />
                    </Form.Group>
                    <div className='d-flex justify-content-between m-2'>
                    <Button variant="outline-secondary" className='text-white' type="submit">
                        Submit
                    </Button>
                    <span className='py-2'>
                        <Link to='/register' className='text-white'>Sign-up</Link>
                    </span>
                    </div>
                    </Form>
                </Card.Body>
                <div className='w-75 m-auto'>
                    {errorMsg}
                </div>
                <div className='w-25 m-auto text-black'>
                    <ClipLoader size={50} loading={loading} color={'white'} width={100}/>
                </div>
            </div>
        </Card>
    )
}

export default Login
