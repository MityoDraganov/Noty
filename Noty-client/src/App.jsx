import './App.css'
import { Routes, Route, useLocation } from "react-router-dom"
import { AuthProvider } from './contexts/AuthContext'

import { Navbar } from './components/NavBar/NavBar'
import { RouteGuard } from "./utilities/RouteGuard"

//static
import { Home } from "./Pages/Home/Home"

//auth
import { Register } from "./Pages/Auth/Register/Register"
import { Login } from "./Pages/Auth/Login/Login"
import { Profile } from './Pages/Profile/Profile'
//notes
import { GuestNotesBoard } from './Pages/GuestNotesBoard/GuestNotesBoard'
import { Dashboard } from './Pages/Dashboard/Dashboard'
import { NoteGroupBoard } from './Pages/NoteGroupBoard/NoteGroupBoard'

function App() {

    //const { pathname } = useLocation()

    return (
        <AuthProvider>
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<RouteGuard component={Profile}/>} />

                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/:groupId" element={<NoteGroupBoard />} />

                <Route path="/guestNotesBoard" element={<GuestNotesBoard />} />
                
                
            </Routes>
        </AuthProvider>
    )
}

export default App
