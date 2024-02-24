import React, {useEffect, useState} from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from 'axios'

const Register = () => {

  const initialState = {
    fullName: "",
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
      const response = await axios.post('/api/auth/register', {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password
      })
      if(response.status === 200) {
        alert("User registered successfully")
        navigate('/login')

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
    <form onSubmit={submitHandler}>
    <div className="flex flex-col mb-4">
        <label for="fullName" className="mb-2 font-medium text-gray-900">
          Full Name
        </label>
        <input
          id="fullName"
          type="text"
          name="fullName"
          onChange={changeHandler}
          className="border border-gray-300 w-full p-2"
          placeholder="Full Name"
        />
      </div>
      <div className="flex flex-col mb-4">
        <label for="email" className="mb-2 font-medium text-gray-900">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          onChange={changeHandler}
          className="border border-gray-300 w-full p-2"
          placeholder="Email"
        />
      </div>
      <div className="flex flex-col mb-4">
        <label for="password" className="mb-2 font-medium text-gray-900">
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          onChange={changeHandler}
          className="border border-gray-300 w-full p-2"
          placeholder="Password"
        />
      </div>
      <p className="mb-4 text-right">Already have an account? <Link to="/login">Login</Link></p>
      <button className="border p-2 text-white w-full bg-blue-500 rounded">Register</button>
      </form>
    </div>
  );
};

export default Register;