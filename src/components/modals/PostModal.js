import React, {useState, useEffect, useMemo} from 'react'
import axios from 'axios'
import {Card, Button, Modal, Form, ToastContainer} from 'react-bootstrap'
import { CustomToast } from '../helpers/CustomToast'
import { toast } from 'react-toastify'


const PostModal = ({show, closeModal, fetchPosts, formHandler, user_id, formData, name, setChars}) => {



    const onSubmit = async(e) => {
        e.preventDefault()

        try{
            const res = await axios({
                method: formData.id ? 'put' : 'post',
                data: {
                    user_id: user_id,
                    post: formData.post,
               },
                url: formData.id ? `http://localhost:8000/api/posts/${formData.id}` : 'http://localhost:8000/api/posts',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
              });
              if(res.data.success){
                  toast(<CustomToast title={'Success'} message={`post successfully ${formData.id ? 'updated' : 'created'}!`} />, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark'
                  })
              }

              console.log(res.data.success)
        }catch(e){
            console.log(e)
        }


        

        fetchPosts()
        closeModal()  
    }


    return (
        <div>
            <Modal show={show} onHide={closeModal}>
                <Modal.Header className='bg-dark text-white border-secondary'>
                <Modal.Title>
                    {formData.id ? "Update post" : "Write a post"}
                </Modal.Title>
                </Modal.Header>
                <Modal.Body className=' bg-dark text-white'>
                    <div className='m-2'>
                    {formData.id ? name : ''}
                    </div>
                <Form.Group className="m-auto " controlId="formBasicEmail">
                <textarea placeholder='write something...' maxLength={140} defaultValue={formData.post} className="form-control bg-dark text-white border-secondary" id="inputID" rows="3" onChange={(e)=>(formHandler('post', e.target.value), setChars(e.target.value.length))}/>
                </Form.Group>
                </Modal.Body>

                <Modal.Footer className='bg-dark border-secondary border-top-0'>
                <Button variant="secondary" onClick={closeModal}>
                    Close
                </Button>
                <Button variant="primary" onClick={onSubmit}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default PostModal
