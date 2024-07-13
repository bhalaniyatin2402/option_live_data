import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import { Spinner } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

import { useLoginMutation } from "../../redux/services/shoonya.api";
import { setCredentials } from "../../redux/slices/auth.slice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [totp, setTotp] = useState("");
  const [error, setError] = useState("")
  const [login, { isLoading }] = useLoginMutation();
  const { isLoggedIn } = useSelector(state => state.auth)

  async function handleLogin() {
    if (totp.toString().length < 6) {
      return setError("totp in not complete")
    }
    setError(() => "")

    try {
      const res = await login(JSON.stringify({
        source: "API",
        apkversion: "js:1.0.0",
        uid: import.meta.env.VITE_APP_UID,
        pwd: import.meta.env.VITE_APP_PWD,
        factor2: totp,
        vc: import.meta.env.VITE_APP_VC,
        appkey:
          import.meta.env.VITE_APP_API_KEY,
        imei: import.meta.env.VITE_APP_IMEI,
      }));

      if(res?.data?.stat == "Ok") {
        dispatch(setCredentials({
          isLoggedIn: true,
          susertoken: res?.data?.susertoken,
          uid: import.meta.env.VITE_APP_UID
        }))
        localStorage.setItem("userinfo", JSON.stringify({
          uid: import.meta.env.VITE_APP_UID,
          susertoken: res.data.susertoken,
          expiry: Date.now() + 6 * 60 * 60 * 1000
        }))
        navigate("/")

      } else if (res?.data?.stat == "Not_Ok") {
        throw new Error(res.data.emsg);
      }
    } catch (error) {
      console.log(error.message);
      return setError(error.message)
    }
    setTotp("")
  }

  if(isLoggedIn || localStorage.getItem("userinfo")) {
    return <Navigate to="/" />
  }

  return (
    <>
      <div className="flex justify-center items-center flex-col gap-2 h-[100vh]">
        <div className="login-box">
          <h1 className="text-center text-2xl font-bold">
            Enter TOTP To Login
          </h1>
          <OtpInput
            value={totp}
            onChange={setTotp}
            numInputs={6}
            renderSeparator={<span> </span>}
            renderInput={(props) => <input {...props} />}
            inputType="number"
            inputStyle="otp-input-style"  
            containerStyle="otp-container-style"
          />
          <button
            onClick={handleLogin}
            className={`px-4 py-1 mx-auto rounded-lg text-xl bg-[#7862CE] ${isLoading && 'opacity-50'} hover:bg-[#5c5283] text-white font-semibold`}
          >
            {isLoading && <Spinner size="sm" className="me-1" />}
            Login
          </button>
        </div>
        {error && <p className="font-semibold text-red-600">{error}</p>}
      </div>
    </>
  );
}
