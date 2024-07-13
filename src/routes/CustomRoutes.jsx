import { Route, Routes } from "react-router-dom";

import Login from "../pages/auth/Login";
import Home from "../pages/Home";
import RequireAuth from "./RequireAuth";

export default function CustomRoutes() {
  return (
    <>
      <Routes>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route path="/login" element={<Login />} />

      </Routes>
    </>
  )
}
