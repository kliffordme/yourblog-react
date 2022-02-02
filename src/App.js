import Dashboard from "./components/Dashboard";
import Login from './login/Login'
import SignUp from './login/SignUp'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { AuthContextProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import {PostContextProvider} from "./contexts/post-context/PostContext"
import { ToastContainer } from 'react-toastify'


function App() {

  return (
    <Router>
      <AuthContextProvider>
        <PostContextProvider>
        <ToastContainer newestOnTop/>
        <Routes>
          <Route path="/" exact element={<PrivateRoute/>} >
            <Route path="/" exact element={<Dashboard/>}/>
          </Route>
          <Route path="/login" exact element={<Login/>} />
          <Route path="/register" element={<SignUp/>} />
        </Routes>
        </PostContextProvider>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
