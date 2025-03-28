
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashBoard from '../Pages/adminDashboard';
import AdminProtectedRoute from '../Features/adminProtectedRoute';

export default function AdminRouter(){


    return(
        <>
        <Routes>
            <Route path="/" element={<AdminDashBoard/>}></Route>
            <Route element={<AdminProtectedRoute/>} />
        

        </Routes>
        </> 
    )
}