import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { createUserWithEmailAndPassword, getAuth, updateCurrentUser, updateProfile } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import Hcaptcha from './Hcaptcha';

const RegisterForm = () => {

  const [passwordState, setPasswordState] = useState("");
  const [usernameState, setUsernameState] = useState("");
  const [emailState,setEmailState] = useState("");
  const navigate = useNavigate();

  function Register(password,email,username) {

    const auth = getAuth();
    createUserWithEmailAndPassword(auth,email,password).then((user) => {
      updateProfile(auth.currentUser, {
        displayName: username
      }).catch(() => {})
      navigate("/")
    }).catch((err) => {
      const errCode = err.code;
      console.log(errCode);
      switch (errCode) {
        case "auth/email-already-in-use":
          toast.error("email déja utiliser!")
          break;
      
        default:
          toast.error("une erreur est survenue")
          console.log(`error: ${errCode}`);
          break;
      }
      
    });
  }

  return (
    <div>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto rounded-full"
            src={"https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"}
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <div className="mt-1">
                  <input
                    onChange={(e) => setUsernameState(e.currentTarget.value)}
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="text"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    onChange={(e) => setEmailState(e.currentTarget.value)}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    onChange={(e) => setPasswordState(e.currentTarget.value)}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot your password?
                  </a>
                </div>
              </div>
              <button
                type="button"
                onClick={() => Register(passwordState,emailState,usernameState)}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RegisterForm;