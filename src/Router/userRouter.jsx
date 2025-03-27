
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserAuthForm } from '../Components/user/userAuthForm';

export default function UserRouter(){



    return (
        <>
        <Routes>
            <Route path='/' element={<UserAuthForm/>}>

            </Route>

        </Routes>

        </>
    )
}