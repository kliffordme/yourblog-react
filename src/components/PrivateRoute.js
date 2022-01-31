import React from 'react'
import { Route, Link, Outlet, Navigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'

export default function PrivateRoute() {
    const {isLogin} = useAuthContext()
    // const isLogin = false;
    return (
        isLogin() ? <Outlet /> : <Navigate to="/login" />
    )
}
