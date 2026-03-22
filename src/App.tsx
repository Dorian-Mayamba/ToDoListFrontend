import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/login'
import Register from './pages/register'
import Home from './pages'
import { DialogModeProvider } from './contexts/DialogModeProvider'
import { TaskIdProvider } from './contexts/TaskIdProvider';
import { TaskFormProvider } from './contexts/TaskFormProvider'
import { AuthProvider } from './contexts/AuthProvider'
import { ActiveTaskProvider } from './contexts/ActiveTaskProvider'

function App() {

  return (
    <Router>
      <AuthProvider>
        <ActiveTaskProvider>
          <TaskFormProvider>
            <DialogModeProvider>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/Login' element={<Login />} />
                <Route path='/Register' element={<Register />} />
              </Routes>
            </DialogModeProvider>
          </TaskFormProvider>
        </ActiveTaskProvider>
      </AuthProvider>
    </Router>


  )
}

export default App
