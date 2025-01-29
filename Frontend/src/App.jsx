import './App.css'
import Login from "./pages/Login"
import Home from "./pages/Home"
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Maintenance from './pages/Maintenance'
import Cancel from './pages/Cancel'
import Confirm from './pages/Confirm'
import Logout from './pages/Logout'
import { useState } from 'react'
import Reports from './pages/Reports'
import Transaction from './pages/Transactions'

function App() {
  const [loginedUser,setLoginedUser] = useState(null);
  const handleLoginUser = (user) =>{
      setLoginedUser(user);
  }
  return (
    <>
      <Router>
            <Routes>
              <Route path="/" element={<Login handleLoginUser = {handleLoginUser} />} />
              <Route path="/home" element={<Home loginedUser = {loginedUser}/>} />
              <Route path="/maintenance" element={<Maintenance loginedUser = {loginedUser}/>}/>
              <Route path="/cancel" element={<Cancel/>}/>
              <Route path="/confirm" element={<Confirm/>}/>
              <Route path="/logout" element={<Logout/>}></Route>
              <Route path='/reports' element={<Reports loginedUser={loginedUser}/>}/>
              <Route path='/transactions' element={<Transaction loginedUser={loginedUser}/>}/>
            </Routes>
      </Router>
    </>
  )
}

export default App
