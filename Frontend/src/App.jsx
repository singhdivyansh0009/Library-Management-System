import './App.css'
import Login from "./pages/Login"
import Home from "./pages/Home"
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Maintenance from './pages/Maintenance'
import Cancel from './pages/Cancel'
import Confirm from './pages/Confirm'
import Logout from './pages/Logout'

function App() {
  return (
    <>
      <Router>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/maintenance" element={<Maintenance/>}/>
              <Route path="/cancel" element={<Cancel/>}/>
              <Route path="/confirm" element={<Confirm/>}/>
              <Route path="/logout" element={<Logout/>}></Route>
            </Routes>
      </Router>
    </>
  )
}

export default App
