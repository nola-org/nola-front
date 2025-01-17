import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ToastError } from "../../services/ToastError/ToastError";
import checked from "../../assets/icons/checked.svg";
import registrationCheck from "../../assets/icons/registrationCheck.svg";
import css from "./ConfirmEmailPage.module.css";
import { instance } from "../../services/axios";

const ConfirmEmailPage = () => {
  const [searchParams] = useSearchParams();
  const [validUrl, setValidUrl] = useState(false);

  useEffect(() => {
    const verifyEmailUrl = (async () => {
      try {
        // https://nola.tryasp.net/api/accounts....
        const { data } = await instance.get(
          `/accounts/confirm-email?userId=${searchParams.get(
            "userId"
          )}&token=${searchParams.get("token")}`
        );
        setValidUrl(true);
      } catch (error) {
        console.log(error);
        ToastError(error?.message);
        setValidUrl(false);
      }
    })();
  }, [searchParams]);
  return (
    <>
      <div>ConfirmEmailPage</div>
      {validUrl ? (
        <div className={css.container}>
          <img src={checked} alt="checked" />
          <p className={`${css.title} dark:text-white`}>
            Email confirmed successfully!
          </p>
          <Link to="/main/authorization" className={css.link}>
            Login
          </Link>
        </div>
      ) : (
        <div className={css.container}>
          <img src={registrationCheck} alt="registrationCheck" />
          <h1 className={`${css.title} dark:text-white`}>Error! Try again</h1>
          <Link to="/main/authorization/registration" className={css.link}>
            Registration
          </Link>
        </div>
      )}
    </>
  );
};

export default ConfirmEmailPage;
// lorejiv995@fanicle.com
// 11111Aa#
// inna3
// email: 'parkorispo@gufum.com', password: '111111Qq#', confirmPassword: '111111Qq#', userName: 'inna4'

// 66a42fc467@emailawb.pro
// 111111Ww#
