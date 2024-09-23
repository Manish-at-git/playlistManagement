import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { TextField, Button, Snackbar } from "@mui/material";
import * as Yup from "yup";
import Image from "next/image";
import { useLoginMutation } from "../redux/slices/rtkSlices/authSlice";
import { useDispatch } from "react-redux";
import { loginSlice } from "../redux/slices/stateSlices/authSlice";
import Link from "next/link";
import { useRouter } from "next/router";
import Loader from "../components/Loader"

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one special character"
    ),
});

const CustomTextField = ({ field, form: { touched, errors }, ...props }) => (
  <TextField
    {...field}
    {...props}
    error={touched[field.name] && Boolean(errors[field.name])}
    helperText={touched[field.name] && errors[field.name]}
    fullWidth
    margin="normal"
    variant="outlined"
  />
);

const SignIn = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [login, { isLoading, error }] = useLoginMutation();
  const [open, setOpen] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      debugger
      const result = await login({
        email: values.email,
        password: values.password,
      }).unwrap();

      console.log({ ...result.userDetails, token: result.token }, "{ ...result.userDetails, token: result.token }")
      localStorage.setItem(
        "user",
        JSON.stringify({ ...result.userDetails, token: result.token })
      );
      dispatch(
        loginSlice({ token: result.token, user: result.userDetails })
      );
      router.push("/");
    } catch (error) {
      setOpen(true);
      console.error("Login failed:", error?.data?.message);
    }
  };
  return (
    <div className="bg-[#E5E5E5] min-h-screen w-full md:px-8 h-full flex items-center justify-evenly">
      <div className="flex flex-col lg:flex-row items-center justify-center h-full">
        <div className="w-full lg:w-1/2 flex justify-center mb-8 lg:mb-0">
          <Image
            src={require("../assets/images/Illustration.png")}
            className="object-contain w-[70%] lg:w-[50%] xl:w-[70%] pt-4 md:pt-0"
          />
        </div>
        <div className="w-full lg:w-1/2 p-4 lg:p-12">
          <div className="bg-white py-6 px-6 md:py-10 md:px-8 lg:py-20 lg:px-10 rounded-md shadow h-full">
            <div className="text-center md:text-left">
              <div className="text-black text-[18px] md:text-[28px] lg:text-[36px] mb-2">
                Welcome to
              </div>
              <div className="text-[#6358DC] text-[24px] md:text-[36px] lg:text-[45px] font-[900] mb-8">
                Music App
              </div>
            </div>
            <Formik
              initialValues={{
                email: "",
                password: "",
                rememberMe: false,
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({
                values,
                isSubmitting,
                errors,
                touched,
                handleChange,
                handleBlur,
              }) => (
                <Form className="w-full">
                  <div className="mb-2 md:mb-4">
                    <Field
                      name="email"
                      label="Email"
                      type="email"
                      component={CustomTextField}
                    />
                  </div>
                  <div className="mb-2 md:mb-4">
                    <Field
                      name="password"
                      label="Password"
                      type="password"
                      component={CustomTextField}
                    />
                  </div>
                  <Button
                    loading={isLoading}
                    type="submit"
                    className="w-full text-white font-bold py-4 px-5 rounded-md"
                    disabled={isSubmitting}
                    sx={{
                      backgroundColor: "#6358DC",
                      color: "white",
                      fontWeight: "bold",
                      width: "100%",
                      paddingY: 2,
                      paddingX: 3,
                    }}
                  >
                    {isLoading ? <Loader /> : "Login"}
                     
                  </Button>
                  <p className="mt-4 text-center text-gray-500">
                    Don&apos;t have an account?{" "}
                    <Link
                      href="/signup"
                      className="text-blue-500 hover:underline"
                    >
                      Register
                    </Link>
                  </p>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={open}
        onClose={() => setOpen(false)}
        message={error?.data?.message}
        autoHideDuration={3000} // Automatically close after 3 seconds
      />
    </div>
  );
};

export default SignIn;
