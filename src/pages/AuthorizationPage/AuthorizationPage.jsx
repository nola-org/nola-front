import React, { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import css from "../AuthorizationPage/AuthorizationPage.module.css";

import { ScrollBar } from "../../components/ScrollBar/ScrollBar";

const AuthorizationPage = () => {
  const [title, setTitle] = useState("Log In");

  return (
    <div className="container">
      <ScrollBar
        labelOne="Sign In"
        pathnameOne="/main/authorization"
        labelTwo="Registration"
        pathnameTwo="/main/authorization/registration"
      />

      <Outlet />
    </div>
  );
};

export default AuthorizationPage;
