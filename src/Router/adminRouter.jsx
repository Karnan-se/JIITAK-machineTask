
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashBoard from '../Pages/adminDashboard';

export default function AdminRouter(){


    return(
        <>
        <Routes>
            <Route path="/" element={<AdminDashBoard/>}></Route>

        </Routes>
        </>
    )
}