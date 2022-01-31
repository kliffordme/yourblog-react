import React, {createContext, useContext, useEffect, useReducer} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {postReducer} from './post-reducer'

const initialState = {
    posts: [],
    isLoading: false,
    post: {}
}

const PostContext = createContext()

export const usePostContext = () => {
    let context = useContext(PostContext)

    if(context === undefined) {
        throw new Error('AuthContextProvider is not used')
    }

    return context;
}


export const PostContextProvider = ({children}) => {
    const navigate = useNavigate()
    const [postState, postDispatch] = useReducer(postReducer, initialState)



    useEffect(()=>{
    }, [])



    return (
        <PostContext.Provider 
        value={{
            postState,
            postDispatch
        }}
        >
            {children}
        </PostContext.Provider>
    )
}