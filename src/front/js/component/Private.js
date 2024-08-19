import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const Private = () => {
    const token = localStorage.getItem('access_token')

    return (
        token ? <Outlet /> : <Navigate to="/login" />
    )
}

export default Private