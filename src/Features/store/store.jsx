import {configureStore} from  "@reduxjs/toolkit"
import { adminAuthReducer , userAuthReducer } from "../slices/authSlice";


export const store = configureStore({
    reducer:{
        admin:adminAuthReducer,
        user:userAuthReducer,

    }
})
export default store;