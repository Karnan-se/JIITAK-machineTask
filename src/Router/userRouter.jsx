
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserAuthForm } from '../Components/user/userAuthForm';
import UserPrivateRoute from '../Features/userProtectedRoute';
import Home from '../Components/user/Home';

export default function UserRouter(){



    return (
        <>
        <Routes>
            <Route path='/login' element={<UserAuthForm/>}></Route>
            <Route element={<UserPrivateRoute />} >
            <Route path='/' element={<Home/>}></Route>
            
            
               </Route>


            

        </Routes>

        </>
    )
}