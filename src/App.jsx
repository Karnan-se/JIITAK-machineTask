import { useState } from 'react'
import { UserAuthForm } from './Components/user/userAuthForm'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminRouter from './Router/adminRouter';
import UserRouter from './Router/userRouter';
import { Toaster, toast } from 'sonner'
import { Provider } from 'react-redux';
import store from './Features/store/store';


function App() {
  

  return (
    <>
      <Toaster position="bottom-center" richColors />
    <Provider store={store}> 
   
    <Router>
      <Routes>
      
        
        <Route path='/*'  element={<UserRouter/>} />
        <Route path='/admin/*' element={<AdminRouter/>} />
      </Routes>

    </Router>
    </Provider>

    
    
     
    </>
  )
}

export default App
