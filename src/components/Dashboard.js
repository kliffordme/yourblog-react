import React, {useState, useEffect, useMemo} from 'react'
import {Card, Button, Dropdown, Toast} from 'react-bootstrap'
import PostModal from './modals/PostModal'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { usePostContext } from '../contexts/post-context/PostContext'
import { toast, ToastContainer } from 'react-toastify'
import { CustomToast } from './helpers/CustomToast'
import { Posts } from './helpers/Posts'
import { FollowedPosts } from './helpers/FollowedPosts'
import { axiosV1 } from '../utils/axios/axios'


const Dashboard = () => {
    const [show, setShow] = useState(false);
    const [user_id, setUserId] = useState()
    const [name, setName] = useState()
    const [formData, setFormData] = useState({})
    const navigate = useNavigate()
    const handleClose = () => setShow(false);
    const { postState, postDispatch } = usePostContext() 
    const { posts, post } = postState;
    const [publicPosts, setPublicPosts] = useState(true)

    useMemo(()=>{
        setFormData({
            post: post.post,
            id: post.id
        })
        }, [post])


    const formHandler = (key, value) => {
        setFormData({
          ...formData,
          [key]: value,
        });
      };


    const fetchUser = async() => {

        const data = await
        axios({
          method: 'get',
          url: 'http://localhost:8000/api/users/view-profile',
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
          },
        });
        console.log(data.data)
        setUserId(data.data.user.id)
        setName(data.data.user.name)
    }

    const fetchPosts = async() => {
        postDispatch({
            type: "FETCHING",
        })
        const res = await
        axios({
          method: 'get',
          url: 'http://localhost:8000/api/posts',
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
          },
        }); 
        postDispatch({
            type: "GET_ALL_POSTS",
            payload: res.data,
        })
        console.log(res)
    }

    const closeModal = () => {
        postDispatch({
            type: "REMOVE_POST"
        })
        setFormData({
            id: null,
            post: ''
        })
        setShow(!show)
    }
    

    const editPost = async(id) => {

        setShow(!show)

        postDispatch({
            type: "VIEW_POST",
            post_id: id,
        })
    }

    useEffect(()=>{
        fetchPosts()
        fetchUser()
    },[])

    const onDelete = async(id) => {
        console.log(id)

        try{
            const data = await
            axios({
              method: 'delete',
              url: `http://localhost:8000/api/posts/${id}`,
              headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
              },
            });
            console.log(data)
            fetchPosts()
            if(data.data.success){
                toast(<CustomToast title={'Deleted'} message={'post successfully deleted!'} />, {
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
        }catch(e){
            console.log(e)
        }

    }

    const onLogout = async() =>{

        const data = await
        axios({
          method: 'get',
          url: 'http://localhost:8000/api/users/logout',
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
          },
        });

        console.log(data)
        navigate('/login')
        localStorage.removeItem('token')
    }


    return (
    <div className='min-vh-100'>
        <div className='pb-4'>
        <nav class="navbar navbar-dark px-3 border border-secondary position-fixed w-100" style={{zIndex:1, background: '#121212'}}>
        <a class="navbar-brand">YourBlog</a>
        <div class="form-inline d-flex flex-row">
            <p class="text-light m-3">{name}</p>
            <Dropdown className='pt-2 '>
                <Dropdown.Toggle variant="dark" id="dropdown-basic"/>
                <Dropdown.Menu variant='dark'>
                    <Dropdown.Item href="#/action-1">View Profile</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Edit Account</Dropdown.Item>
                    <Dropdown.Item onClick={onLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
        </nav>
        </div>
        <div className='d-flex justify-content-around min-vh-100'>
            <div className='flex-fill bg-dark text-white py-5 w-25'>
                {/* Profile page */}
            </div>

            <div className='flex-fill p-2 bg-dark border-top-0 border border-secondary text-white py-5 w-50'>
                <div className='d-flex m-auto w-50 mt-3' >
                    <Button onClick={()=>setPublicPosts(true)} className={`m-2 ${publicPosts ? 'text-white' : ''}`} variant="outline-secondary">PUBLIC POSTS</Button>
                    <Button onClick={()=>setPublicPosts(false)} className={`m-2 ${publicPosts ? '' : 'text-white'}`} variant="outline-secondary" >FOLLOWED POSTS</Button>
                </div>
                {publicPosts === true ? <div>
                    <input onClick={()=>setShow(!show)} style={{cursor:'pointer'}} class="form-control w-75 m-auto my-3 bg-dark border-secondary" type="text" placeholder="Write something…" readOnly></input>
                    <Posts 
                    name={name}    
                    user_id={user_id}
                    fetchPosts={fetchPosts} 
                    onDelete={onDelete}
                    editPost={editPost}
                    />
                </div> : 
                <>
                    <FollowedPosts name={name} user_id={user_id} fetchPosts={fetchPosts} onDelete={onDelete} editPost={editPost} />
                </>
                }

            </div>
            <div className='flex-fill bg-dark text-white py-5 w-25 position-relative'>
                <div className='m-auto'>
                    {/* people you may know:  */}
                </div>
            </div>
        </div>
        <PostModal name={name} user_id={user_id} closeModal={closeModal} formData={formData} formHandler={formHandler} editPost={editPost} show={show} handleClose={handleClose} fetchPosts={fetchPosts}/>
    </div>
    )
}

export default Dashboard
