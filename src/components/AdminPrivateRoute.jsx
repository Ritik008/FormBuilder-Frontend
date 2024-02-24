import React from 'react'
import { Navigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";

const AdminPrivateRoute = ({children}) => {
  const token = localStorage.getItem('token')
  if(!token) {
    return <Navigate to="/admin/login"/>
  }else {
    const decoded = jwtDecode(token);
    if(decoded.role === 'admin') {
        return children
    }else {
        return <Navigate to="/admin/login" />
    }
  }
}

export default AdminPrivateRoute