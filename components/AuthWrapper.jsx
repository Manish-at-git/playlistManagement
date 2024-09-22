// components/AuthWrapper.js
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { loginSlice } from "../redux/slices/stateSlices/authSlice";

const AuthWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const router = useRouter();

  console.log(isAuthenticated, "isAuthenticated");

  useEffect(() => {
    const checkAuth = () => {
      const result = JSON.parse(localStorage.getItem("user"));
      if (result?.token) {
        dispatch(
          loginSlice({
            token: result?.token,
            id: result?.id,
            email: result?.email,
          })
        );
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    const publicRoutes = ["/signin", "/signup"];
    if (!isAuthenticated && !publicRoutes.includes(router.pathname)) {
      router.push("/signin");
    } else if (isAuthenticated && publicRoutes.includes(router.pathname)) {
      router.push("/");
    }
  }, [isAuthenticated, router.pathname]);

  if (
    !isAuthenticated &&
    router.pathname !== "/signin" &&
    router.pathname !== "/signup"
  ) {
    return null;
  }

  if (!isAuthenticated) {
    return children;
  }

  return (
    <div className="bg-[#111111] h-screen">
      <div className="mx-auto w-[70%]">
        <div className="flex w-full">{children}</div>
      </div>
    </div>
  );
};

export default AuthWrapper;
