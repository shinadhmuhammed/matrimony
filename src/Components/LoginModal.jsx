import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


function LoginModal({
  isOpen,
  onClose,
  handleShowForgotPassword,
  handleShowSignup,
  loginData,
  handleChange,
}) {
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

  return (
    
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      
      <div className="bg-white p-6 rounded-lg shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &#x2715;
        </button>
        <div className="flex flex-col items-center mb-4">
          <img
            src="https://img2.shaadi.com/assests/2016/images/home-page-layer-logo.png"
            alt="Welcome"
            className="w-10 h-10 mb-4"
          />
          <h2 className="text-2xl font-semibold">Welcome back! Please Login</h2>
        </div>
        <Formik
          initialValues={loginData}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Email is required";
            } else if (!/\S+@\S+\.\S+/.test(values.email)) {
              errors.email = "Invalid email address";
            }
            if (!values.password) {
              errors.password = "Password is required";
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            const auth = getAuth();
            try {
              const userCredential = await signInWithEmailAndPassword(
                auth,
                values.email,
                values.password
              );
              const user = userCredential.user;
           
              localStorage.setItem("userId", user.uid);
              onClose();
            } catch (error) {
              console.error("Error signing in:", error.message);
              if (error.code === "auth/invalid-credential" || error.code === "auth/user-not-found") {
                setErrorMessage("Invalid email or password");
                setErrorMessage('')
              } else {
                setErrorMessage("Error signing in. Please try again later.");
              }
            }
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
                >
                  Your email
                </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="name@gmail.com"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 mt-1"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
                >
                  Your password
                </label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 mt-1"
                />
              </div>
              {errorMessage && (
                <div className="text-red-500 mb-4">{errorMessage}</div>
              )}
              <button
                type="submit"
                className="w-full text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-300 mt-4">
                New to Shaadi?{" "}
                <button
                  type="button"
                  className="text-blue-700 hover:underline dark:text-blue-500"
                  onClick={handleShowSignup}
                >
                  Sign Up Free
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default LoginModal;
