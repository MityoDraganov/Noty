import './App.css'
import { Routes, Route, useLocation } from "react-router-dom"

import { Navbar } from './components/NavBar/NavBar'

import { Home } from "./Pages/Home/Home"

import { Dashboard } from './Pages/Dashboard/Dashboard'
import { NoteGroupBoard } from './Pages/NoteGroupBoard/NoteGroupBoard'



//auth
import { Register } from "./Pages/Auth/Register/Register"
import { Login } from "./Pages/Auth/Login/Login"
import { AuthProvider } from './contexts/AuthContext'
import { GuestNotesBoard } from './Pages/GuestNotesBoard/GuestNotesBoard'

function App() {

    const { pathname } = useLocation()

    return (
        <AuthProvider>
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />

                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/:groupId" element={<NoteGroupBoard />} />

                <Route path="/guestNotesBoard" element={<GuestNotesBoard />} />
                
                
            </Routes>
        </AuthProvider>
    )
}

export default App
