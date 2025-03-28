import { useState } from 'react'
import { UserAuthForm } from './Components/user/userAuthForm'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminRouter from './Router/adminRouter';
import UserRouter from './Router/userRouter';

function App() {
  

  return (
    <>
    <Router>
      <Routes>
        <Route path='/'  element={<UserRouter/>} />
        <Route path='/admin/*' element={<AdminRouter/>} />
      </Routes>

    </Router>

    
    
     
    </>
  )
}

export default App
