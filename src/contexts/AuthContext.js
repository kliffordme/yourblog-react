import React, {createContext, useContext, useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export const useAuthContext = () => {
    let context = useContext(AuthContext)

    if(context === undefined) {
        throw new Error('AuthContextProvider is not used')
    }

    return context;
}


export const AuthContextProvider = ({children}) => {
    const navigate = useNavigate()
    const [errorMsg, setErrorMsg] = useState('')
    const login = async(email, password) => {

        try{
            const data = await
            axios({
              method: 'post',
              url: 'https://yourblog-api.herokuapp.com/api/users/login',
              data: {email: email, password: password},
            });
            console.log(data)
            if(data.data.success){
                localStorage.setItem('token', data.data.token)
                navigate('/')
            }
        }catch(e){
            console.log(e.response.data.message)
            setErrorMsg(e.response.data.message)
        }

    }

    useEffect(()=>{
        isLogin()
    }, [])

    const isLogin = () => {
        if(localStorage.getItem('token') !== null){
            return true;
        }
        else return false;
    }


    return (
        <AuthContext.Provider 
        value={{
            login,
            isLogin, 
            errorMsg
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}