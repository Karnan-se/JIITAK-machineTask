
import {useSelector} from "react-redux"
import { Navigate, Outlet } from "react-router-dom"




export default function AdminProtectedRoute(){

    const adminInfo = useSelector((state)=> state.admin.adminInfo)

    return adminInfo ? <Outlet/> : <Navigate to="/admin/login" replace />;
}