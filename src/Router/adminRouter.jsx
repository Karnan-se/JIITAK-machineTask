
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashBoard from '../Pages/adminDashboard';
import AdminProtectedRoute from '../Features/adminProtectedRoute';
import AdminLogin from '../Pages/adminLogin';

export default function AdminRouter(){


    return(
        <>
        <Routes>
        <Route path="/login" element={<AdminLogin/>}></Route>
            
            <Route element={<AdminProtectedRoute/>} > 
            <Route path="/" element={<AdminDashBoard/>}></Route>
            
            </Route>
        

        </Routes>
        </> 
    )
}