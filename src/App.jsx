import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import { useNavigate, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/navbar';
import Register from './components/Register/register';
import Login from './components/Login/login';
import Dashboard from './components/Dashboard/dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import ProfileForm from './components/Profile/Profile';
import EditProfile from './components/Profile/EditProfile';


function App() {

  return (
      <AuthProvider >
        <div className='App'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/dashboard' 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } /> 
            <Route path="/edit-profile" 
              element={
                <ProtectedRoute>
                  <EditProfile />
                </ProtectedRoute>
              } />
            <Route path="/profile" 
              element={
                <ProtectedRoute>
                  <ProfileForm />
                </ProtectedRoute>
              } />
          </Routes>
        </div>
        </AuthProvider >
  )
}

export default App
