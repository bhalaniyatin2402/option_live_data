import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { setCredentials } from "../redux/slices/auth.slice";

export default function RequireAuth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userinfo = JSON.parse(localStorage.getItem("userinfo"));
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isLoggedIn) {
      if (!userinfo) {
        navigate("/login");
      }
      if (userinfo?.expiry > Date.now()) {
        dispatch(
          setCredentials({
            isLoggedIn: true,
            uid: userinfo.uid,
            susertoken: userinfo.susertoken,
          })
        );
      } else {
        localStorage.removeItem("userinfo");
        navigate("/login");
      }
    }
  }, []);

  if(userinfo?.expiry < Date.now()) {
    localStorage.removeItem("userinfo")
  }

  return isLoggedIn || (userinfo && userinfo?.expiry > Date.now()) ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
}
