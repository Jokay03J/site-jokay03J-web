import { useState } from "react"
import logoimage from "../image/logo.png"
import { getAuth, signInWithEmailAndPassword, FacebookAuthProvider, signInWithPopup, TwitterAuthProvider, GithubAuthProvider } from "firebase/auth";
import {app} from "../util/firebase";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import Alert from "./Alert";
import ModalNewPassword from "./ModalResetPassword";

const LoginForm = () => {

  const [emailState, setEmailState] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const navigate = useNavigate();
  const [resetPasswordOpen,setResetPasswordOpen] = useState(false);

  //submit function
function Login(emailState, passwordState, navigate) {

  const auth = getAuth(app);
  signInWithEmailAndPassword(auth, emailState, passwordState)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      navigate("/")
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      switch (errorCode) {
        case "auth/wrong-password":
          toast.error("mot de passe invalide!")
          break;

        case "auth/user-not-found":
          toast.error("utilisateur non trouver")
          break;

        case "auth/user-disabled":
          toast.error("compte désactiver")
          break;

        default:
          console.log(errorCode);
          break;
      }
    });

}

  return (
    <>
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
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    onChange={(e) => setEmailState(e.currentTarget.value)}
                    id="email"
                    name="email"
                    type="email"
                    value={emailState}
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
                    value={passwordState}
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
                  <a onClick={() => setResetPasswordOpen(true)} className="cursor-pointer font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot your password?
                  </a>
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => Login(emailState, passwordState, navigate)}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
      <ModalNewPassword open={resetPasswordOpen} onClose={() => setResetPasswordOpen(false)}/>
      <ToastContainer/>
    </>
  )
}

export default LoginForm