
import { useFormik } from "formik"
import * as Yup from "yup"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setAdminCredentials } from "../Features/slices/authSlice"
import { adminApi } from "../Features/api/axiosInstance"
import {toast} from "sonner"

export default function AdminLogin() {
  const [serverError, setServerError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const adminLogin = async (email, password) => {
    try {
      const adminLogin = await adminApi.post("/login", { email, password })
      dispatch(setAdminCredentials(adminLogin.data.adminDetals))
      navigate("/admin")

      return adminLogin.data.adminDetals
    } catch (error) {
        toast.error(error.response.data.message || "unexpected Data")
      
      throw error
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true)
      setServerError("")

      try {
        const result = await adminLogin(values.email, values.password)

        if (result.error) {
          setServerError(result.error)
        } else {
          // Success is handled in adminLogin function (navigate to /admin)
          console.log("Login successful", result)
        }
      } catch (error) {
        setServerError(error.response?.data?.message || "An unexpected error occurred. Please try again.")
      } finally {
        setIsSubmitting(false)
      }
    },
  })

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-md">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-black">Admin Login</h1>
          <p className="text-gray-600">Enter your credentials to access the admin panel</p>
        </div>

        {serverError && <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-800">{serverError}</div>}

        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-900">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full rounded-md border ${
                formik.touched.email && formik.errors.email ? "border-red-500" : "border-gray-300"
              } p-2.5 text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black`}
              placeholder="Enter your email"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full rounded-md border ${
                formik.touched.password && formik.errors.password ? "border-red-500" : "border-gray-300"
              } p-2.5 text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black`}
              placeholder="Enter your password"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 w-full rounded-md bg-black p-2.5 text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:bg-gray-400"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  )
}

