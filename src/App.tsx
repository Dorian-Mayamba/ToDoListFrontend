import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Login from './pages/login'
import Register from './pages/register'
import Home from './pages'
import { DialogModeProvider } from './contexts/DialogModeProvider'
import { TaskFormProvider } from './contexts/TaskFormProvider'
import { AuthProvider } from './contexts/AuthProvider'
import { ActiveTaskProvider } from './contexts/ActiveTaskProvider'
import EditTask from './pages/tasks/editTasks';
import AddTask from './pages/tasks/addTasks'

function App() {

  const PrivateRoutes = () => {
    const token = localStorage.getItem('token');

    return token ? <Outlet /> : <Navigate to={"/login"}/>
  }

  return (
    <Router>
      <AuthProvider>
        <ActiveTaskProvider>
          <TaskFormProvider>
            <DialogModeProvider>
              <Routes>
                <Route element={<PrivateRoutes />}>
                  {" "}
                  <Route path='/' element={<Home />}/>
                  <Route path='/tasks/add' element={<AddTask />}/>
                  <Route path= '/tasks/:id/edit' element={<EditTask />} />
                </Route>
                <Route path='/Register' element={<Register />} />
                <Route path='/login' element={<Login />}/>
              </Routes>
            </DialogModeProvider>
          </TaskFormProvider>
        </ActiveTaskProvider>
      </AuthProvider>
    </Router>


  )
}

export default App
