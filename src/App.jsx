import { useState } from 'react'
import { UserAuthForm } from './Components/user/userAuthForm'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashBoard from './Pages/adminDashboard';

function App() {
  

  return (
    <>
    <Router>
      <Routes>
        <Route path='/'  element={<UserAuthForm/>} />
        <Route path='/admin' element={<AdminDashBoard/>} />

        

      </Routes>

    </Router>

    
    
     
    </>
  )
}

export default App
