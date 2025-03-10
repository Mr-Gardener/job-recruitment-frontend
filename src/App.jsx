import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import { useNavigate, Routes, Route } from 'react-router-dom';
import Register from './components/Register/register';
import Login from './components/Login/login';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import ProfileForm from './components/Profile/Profile';
import EditProfile from './components/Profile/EditProfile';
import JobList from './components/Job-listing/jobList';
import PostJobForm from './components/Job-listing/postJob';
import JobDetails from './components/Job-listing/jobDetails';
import { useAuth } from './context/AuthContext';



function App() {
  const { user } = useAuth(); // Get the current user from AuthContext

  return (
      <AuthProvider >
        <div className='App'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
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
            <Route path="/jobs" element={<JobList />} />
            <Route path="/jobs/:id" element={<JobDetails />} />
            <Route path="/post-job" 
              element={
                <ProtectedRoute user={user} requiredRole="employer">
                  <PostJobForm />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
        </AuthProvider >
  )
}

export default App;
