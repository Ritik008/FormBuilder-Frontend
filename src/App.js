import FormBuilder from "./page/FormBuilder";
import { Routes, Route, Form} from 'react-router-dom'
import FormPublish from './page/FormPublish'
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import Forms from "./page/Forms";
import PrivateRoute from "./components/PrivateRoute";
import Admin from "./page/Admin";
import AdminLogin from './page/AdminLogin'
import AdminPrivateRoute from "./components/AdminPrivateRoute";
import {jwtDecode} from 'jwt-decode'
import AdminNavbar from "./components/AdminNavbar";
import Submission from "./page/Submission";
function App() {
  const token = localStorage.getItem('token')
  let decoded
  if(token) {
    decoded = jwtDecode(token)
  }
  return (
    <div className="App">
      {
        localStorage.getItem('token') && decoded.role === 'admin' && (
          <AdminNavbar />
        )
      }
      {
        localStorage.getItem('token') && decoded.role === 'user' && (
          <Navbar />
        )
      }
      <Routes>
        <Route path="/login" exact element={<Login />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/admin/login" exact element={<AdminLogin />}/>
        <Route path="/admin" exact element={<AdminPrivateRoute><Admin /></AdminPrivateRoute>}/>
        <Route path="/" exact element={<PrivateRoute><Forms /></PrivateRoute>} />
        <Route path="/create" exact element={<PrivateRoute><FormBuilder /></PrivateRoute>} />
        <Route path="/form/:id" exact element={<PrivateRoute><FormPublish /></PrivateRoute>} />
        <Route path="/submission/:id" exact element={<PrivateRoute><Submission /></PrivateRoute>} />
      </Routes>
    </div>
  );
}

export default App;
