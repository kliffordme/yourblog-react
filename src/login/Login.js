import React,{useState, useEffect} from 'react'
import {Form, Button, Card, Nav} from 'react-bootstrap'
import axios from 'axios'
import {Link, Navigate} from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'


const Login = () => {
    const {login} = useAuthContext()
    const [formData, setFormData] = useState({
        email : '',
        password: '',
    })

    const formHandler = (key, value) => {
        setFormData({
          ...formData,
          [key]: value,
        });
      };

    const onSubmit = async(e) => {
        e.preventDefault()
        try{
            const data = await login(formData.email, formData.password)
        }catch(e){
            console.log(e)
        }
    }


    return (
        <Card className='vh-100'>
            <div className='mw-25 m-auto border rounded position-relative'>
                <Card.Header>
                    Blog App
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
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e)=>formHandler('password', e.target.value)} />
                    </Form.Group>
                    {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="remember me" />
                    </Form.Group> */}
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    <span className='position-absolute end-0 m-3'>
                        <Link to='/register'>Sign-up</Link>
                    </span>
                    </Form>
                </Card.Body>

            </div>
        </Card>
    )
}

export default Login
