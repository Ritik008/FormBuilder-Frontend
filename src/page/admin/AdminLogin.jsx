import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from 'axios'
import { BASE_URL } from "../../constant";

const Login = () => {

  const initialState = {
    email: "",
    password: ""
  }

  const [formData, setFormData] = useState(initialState)
  const [error, setError] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)

  const changeHandler = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const submitHandler = (e) => {
    e.preventDefault()
    setError(validate(formData))
    setIsSubmit(true)
  }

  const validate = (formData) => {
    const error = {}
    const emailRegex = RegExp(/^\S+@\S+\.\S+$/);
    if (formData.email === '') {
      error.email = 'Email cannot be empty'
    } else if (!emailRegex.test(formData.email)) {
      error.email = "Invalid email format"
    }
    if (formData.password === '') {
      error.password = 'Password cannot be empty'
    }
    return error
  }

  const loginUser = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/admin/login`, {
        email: formData.email,
        password: formData.password
      })
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token)
        window.location.href = "/admin"
      } else {
        alert("Something went wrong")
      }
    } catch (err) {
      console.error(err)
      alert(err?.response?.data?.error?.message)
    }
  }
  useEffect(() => {
    if (isSubmit && Object.keys(error).length === 0) {
      loginUser()
    }
  }, [error])

  const token = localStorage.getItem('token')
  if (token) {
    return <Navigate to="/" />
  }

  return (
    <div className="mt-12 sm:mt-24 container mx-auto max-w-md px-4">
      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="text"
            name="email"
            className="mt-1 block p-3 border w-full rounded border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            placeholder="Email"
            onChange={changeHandler}
          />
          <p className="text-red-500">{error?.email}</p>
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            className="mt-1 block p-3 border w-full rounded border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            placeholder="Password"
            onChange={changeHandler}
          />
          <p className="text-red-500">{error?.password}</p>
        </div>
        <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Admin Login
        </button>
        <p className="mb-4 text-right mt-5"><Link to="/login">Login as User</Link></p>
      </form>
    </div>
  );
};

export default Login;
