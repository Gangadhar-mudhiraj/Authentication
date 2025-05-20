
import { Routes, Route } from 'react-router-dom'
import Login from "./pages/Login.jsx"
import Signup from "./pages/Signup.jsx"
import Home from "./pages/Home.jsx"
import { Navigate } from 'react-router-dom'
import { useState } from 'react'
import RefreshHandler from './RefreshHandler.jsx'

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  }

  return (
    <>

      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        {/* <Route path='/home' element={<Home />} /> */}
        <Route path='/home' element={<PrivateRoute element={<Home />} />} />
      </Routes>
    </>
  )
}

export default App