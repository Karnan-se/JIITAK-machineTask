
import {useSelector} from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
export default function UserPrivateRoute(){

    const userInfo = useSelector((state)=> state.user.userInfo)
    console.log(userInfo , "userInfo from Protected Route")

    

    return userInfo ? <Outlet context={{onlineUsers}} /> : <Navigate to="/login" replace />;
}