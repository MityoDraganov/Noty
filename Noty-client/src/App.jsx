import './App.css'
import { Routes, Route, useLocation } from "react-router-dom"

import { Home } from "./Pages/Home/Home"
import { Dashboard } from './Pages/Dashboard/Dashboard'
import { Navbar } from './components/NavBar/NavBar'

//auth
import { Register } from "./Pages/Auth/Register/Register"
import { Login } from "./Pages/Auth/Login/Login"
import { AuthProvider } from './contexts/AuthContext'

function App() {

    const { pathname } = useLocation()

    return (
        <AuthProvider>
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </AuthProvider>
    )
}

export default App
