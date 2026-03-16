import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/login'
import Register from './pages/register'
import Home from './pages'
import { DialogModeProvider } from './contexts/DialogModeProvider'
import { TaskIdProvider } from './contexts/TaskIdProvider';
import { FormProvider } from './contexts/FormProvider'

function App() {

  return (
    <Router>
      <TaskIdProvider>
        <FormProvider>
          <DialogModeProvider>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/Login' element={<Login />} />
              <Route path='/Register' element={<Register />} />
            </Routes>
          </DialogModeProvider>
        </FormProvider>
      </TaskIdProvider>

    </Router>


  )
}

export default App
