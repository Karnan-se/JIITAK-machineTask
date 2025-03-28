import { useEffect, useState } from "react";
import { Button, Tab, Tabs, TextField, Paper, CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { userApi } from "../../Features/api/axiosInstance";
import { toast } from "sonner";
import {useNavigate} from "react-router-dom" 
import {useSelector} from  "react-redux"
import { useDispatch } from "react-redux";
import { setUserCredentials } from "../../Features/slices/authSlice";


export function UserAuthForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userInfo = useSelector((state)=> state.user.userInfo)

  useEffect(()=>{
    if(userInfo){
      navigate("/")
    }

  },[])


  const validationSchema = Yup.object({
    name: activeTab === "register" ? Yup.string().required("Name is required") : Yup.string(),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Must contain at least one uppercase letter")
      .matches(/[0-9]/, "Must contain at least one number")
      .required("Password is required"),
    confirmPassword: activeTab === "register"
      ? Yup.string()
          .oneOf([Yup.ref("password")], "Passwords must match")
          .required("Confirm Password is required")
      : Yup.string(),
  });

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      let response;
      if (activeTab === "login") {
        response = await userApi.post("/login", {
          email: values.email,
          password: values.password,
        });
       
      } else {
        response = await userApi.post("/register", {
          name: values.name,
          email: values.email,
          password: values.password,
        });
      }
      toast.success(activeTab === "login" ? "Login successful!" : "Registration successful!");
      if(response){
        console.log(response.data.userDetails , "userDetaills")
        const credentials = response.data.userDetails
        navigate("/")
        dispatch(setUserCredentials(credentials))
      }
    } catch (error) {
      let errorMessage = "Something went wrong";
      if (error.response) {
        errorMessage = error.response.data?.error?.message || error.response.statusText || "Unexpected Error";
      } else if (error.request) {
        errorMessage = "No response from server. Please try again.";
      } else {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: handleSubmit,
  });

  return (
    <div style={{ maxWidth: "400px", margin: "40px auto" }}>
      <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} centered>
        <Tab label="Login" value="login" />
        <Tab label="Register" value="register" />
      </Tabs>

      <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
        <form onSubmit={formik.handleSubmit}>
          {activeTab === "register" && (
            <TextField
              fullWidth
              label="Name"
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              margin="normal"
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          )}
          <TextField
            fullWidth
            label="Email"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            margin="normal"
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            margin="normal"
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          {activeTab === "register" && (
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              margin="normal"
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            />
          )}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : activeTab === "login" ? "Sign In" : "Create Account"}
          </Button>
        </form>
      </Paper>
    </div>
  );
}
