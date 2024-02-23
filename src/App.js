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
function App() {
  return (
    <div className="App">
      {
        localStorage.getItem('token') && (
          <Navbar />
        )
      }
      <Routes>
        <Route path="/login" exact element={<Login />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/admin" exact element={<Admin />}/>
        <Route path="/admin/login" exact element={<AdminLogin />}/>
        <Route path="/" exact element={<PrivateRoute><Forms /></PrivateRoute>} />
        <Route path="/create" exact element={<PrivateRoute><FormBuilder /></PrivateRoute>} />
        <Route path="/form/:id" exact element={<PrivateRoute><FormPublish /></PrivateRoute>} />
      </Routes>
    </div>
  );
}

export default App;
