import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ToastError } from "../../services/ToastError/ToastError";
import checked from "../../assets/icons/checked.svg";
import registrationCheck from "../../assets/icons/registrationCheck.svg";
import css from "./ConfirmEmailPage.module.css";

const ConfirmEmailPage = () => {
  const [searchParams] = useSearchParams();
  const [validUrl, setValidUrl] = useState(false);

  useEffect(() => {
    const verifyEmailUrl = (async () => {
      try {
        // const { data } = await instance.get(
        //   `/accounts/confirm-email?userId=${searchParams.get(
        //     "userId"
        //   )}&token=${searchParams.get("token")}`
        // );
        // const { data } = await instance.get(
        //   `/main/confirm-email?status=${searchParams.get("status")}`
        // );
        const status = searchParams.get("status");

        if (status === "success") {
          setValidUrl(true);
          return;
        }
        if (status !== "success") {
          setValidUrl(false);
          throw new Error();
        }
      } catch (error) {
        ToastError(error?.message);
        setValidUrl(false);
      }
    })();
  }, [searchParams]);
  return (
    <>
      {validUrl ? (
        <div className={css.container}>
          <img src={checked} alt="checked" />
          <div className={css.title_container}>
            <h1>Success!</h1>
            <p className={`${css.title} dark:text-white`}>
              Your email address has been verified.
            </p>
          </div>
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

//  7cbc189028@emailawb.pro
//  3dee87ca2d@emailawb.pro
// d87fd9300e@emailawb.pro
// 111111Ww#
// 8a3d264267@emailawb.pro
// 44444Aa@
