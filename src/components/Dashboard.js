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
import { Users } from './helpers/Users'
import { Profile } from './helpers/Profile'
import { BeatLoader } from 'react-spinners'

const Dashboard = () => {
    const [show, setShow] = useState(false);
    const [profile, setProfile] = useState({
        id: '',
        name: '',
        email: ''
    })
    const [formData, setFormData] = useState({})
    const navigate = useNavigate()
    const handleClose = () => setShow(false);
    const { postState, postDispatch } = usePostContext() 
    const { posts, post } = postState;
    const [publicPosts, setPublicPosts] = useState(true)
    const [loading, setLoading] = useState(false)

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
          url: 'https://yourblog-api.herokuapp.com/api/users/view-profile',
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
          },
        });
        console.log(data.data)
        console.log(data.data.user.email)
        setProfile({
            id: data.data.user.id,
            name: data.data.user.name,
            email: data.data.user.email
        })
    }

    // https://yourblog-api.herokuapp.com/api/users/register
    const fetchPosts = async() => {
        setLoading(true)
        postDispatch({
            type: "FETCHING",
        })
        const res = await
        axios({
          method: 'get',
          url: 'https://yourblog-api.herokuapp.com/api/posts',
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
          },
        }); 
        postDispatch({
            type: "GET_ALL_POSTS",
            payload: res.data,
        })
        setLoading(false)
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
              url: `https://yourblog-api.herokuapp.com/api/posts/${id}`,
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
          url: 'https://yourblog-api.herokuapp.com/api/users/logout',
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
        <nav id='nav-bar' className="navbar navbar-dark px-3 position-fixed w-100" >
        <a className="navbar-brand"><h2 id='title'>YourBlog</h2></a>
        <div className="form-inline d-flex flex-row">
            <h6 className="text-light m-3">Options</h6>
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
                <Profile name={profile.name} email={profile.email}/>
            </div>

            <div className='flex-fill p-2 bg-dark border-top-0 text-white py-5 w-50'>
                <div className='d-flex justify-content-around m-auto w-50 mt-3' >
                    <Button id="option-btn" onClick={()=>setPublicPosts(true)} className={`m-2 shadow-none ${publicPosts ? 'text-white' : ''}`} variant="outline-secondary border-0">PUBLIC POSTS</Button>
                    <Button id="option-btn" onClick={()=>setPublicPosts(false)} className={`m-2 shadow-none ${publicPosts ? '' : 'text-white'}`} variant="outline-secondary border-0" >FOLLOWED POSTS</Button>
                </div>
                {publicPosts === true ? <div >
                    <input onClick={()=>setShow(!show)} style={{cursor:'pointer'}} id="inputID" className="form-control w-75 m-auto my-3 bg-dark shadow-none border-secondary " type="text" placeholder="Write something…" readOnly></input>
                    <div className='d-flex justify-content-center'> 
                    <BeatLoader color='white' loading={loading} size={15}/>
                    </div>
                    <Posts 
                    name={profile.name}    
                    user_id={profile.id}
                    fetchPosts={fetchPosts} 
                    onDelete={onDelete}
                    editPost={editPost}
                    />
                </div> : 
                <>
                    <FollowedPosts name={profile.name} user_id={profile.id} fetchPosts={fetchPosts} onDelete={onDelete} editPost={editPost} />
                </>
                }

            </div>
            <div className='flex-fill bg-dark text-white py-5 w-25 position-relative'>
                <div className='m-auto'>
                    <Users user_id={profile.id} fetchPosts={fetchPosts} />
                </div>
            </div>
        </div>
        <PostModal name={profile.name} user_id={profile.id} closeModal={closeModal} formData={formData} formHandler={formHandler} editPost={editPost} show={show} handleClose={handleClose} fetchPosts={fetchPosts}/>
    </div>
    )
}

export default Dashboard
