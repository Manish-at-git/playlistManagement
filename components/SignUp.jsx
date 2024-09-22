import React from "react";
import { Formik, Form, Field } from "formik";
import {
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Alert,
} from "@mui/material";
import * as Yup from "yup";
import Image from "next/image";
import { useRegisterMutation } from "../redux/slices/rtkSlices/authSlice";
import Link from "next/link";
import { Router, useRouter } from "next/router";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
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
  const [register, { isLoading, error }] = useRegisterMutation();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const result = await register({
        name: values.name,
        email: values.email,
        password: values.password,
      }).unwrap();
      router.push("/signin");
    } catch (error) {
      console.error("Login failed:", error);
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
              <div className="text-[#6358DC] text-[24px] md:text-[36px] lg:text-[45px] font-[900] md:mb-8">
                Music App
              </div>
            </div>
            <Formik
              initialValues={{
                name: "", // Initialize name
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
                      name="name"
                      label="Name"
                      type="text"
                      component={CustomTextField}
                    />
                  </div>
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
                    Register
                  </Button>
                  <p className="mt-4 text-center text-gray-500">
                    Already have an account?{" "}
                    <Link
                      href="/signin"
                      className="text-blue-500 hover:underline"
                    >
                      Login
                    </Link>
                  </p>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
