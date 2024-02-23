import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from 'axios'

const Admin = () => {

  const initialState = {
    email: "",
    password: ""
  }

  const [formData, setFormData] = useState(initialState)
  const [error, setError] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)
  const navigate = useNavigate()

  const changeHandler = (e) => {
    const {name, value} = e.target
    setFormData({...formData, [name]: value})
  }

  const submitHandler = (e) => {
    e.preventDefault()
    setError(validate(formData))
    setIsSubmit(true)
  }

  const validate = (formData) => {
    const error = {}
    const emailRegex = RegExp(/^\S+@\S+\.\S+$/);
    if(formData.email === '') {
      error.email = 'Email cannot be empty'
    }else if(!emailRegex.test(formData.email)) {
      error.email = "Invalid email format"
    }
    if(formData.password === '') {
      error.password = 'Password cannot be empty'
    }
    return error
  }

  const loginUser = async () => {
    try {
      const response = await axios.post('/api/auth/login', {
        email: formData.email,
        password: formData.password
      })
      if(response.status === 200) {
        localStorage.setItem('token', response.data.token)
        window.location.href="/"
      }else {
        alert("Something went wrong")
      }
    }catch(err) {
      console.error(err)
      alert(err?.response?.data?.error?.message)
    }
  

  }
  useEffect(() => {
    if(isSubmit && Object.keys(error).length === 0) {
      loginUser()
    }
  }, [error])

  const token = localStorage.getItem('token')
  if(token) {
    return <Navigate to="/" />  
  }


  return (
    <div className="mt-48 container w-[30%] m-auto">
      
    </div>
  );
};

export default Admin;
