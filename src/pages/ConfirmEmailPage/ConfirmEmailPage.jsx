import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ToastError } from "../../services/ToastError/ToastError";
import axios from "axios";

const ConfirmEmailPage = () => {
  const params = useParams();
  const [validUrl, setValidUrl] = useState(false);

  useEffect(() => {
    const verifyEmailUrl = (async () => {
      try {
          const url = `http://nola.tryasp.net/api/accounts/confirm-email?userId=${params.userId}&token=${params.token}`;
         const {data} = await axios.get(url)
          setValidUrl(true);
          
        console.log("url", url);
          console.log("params-1", params);
          console.log('data', data);
          
      } catch (error) {
        console.log(error);
        ToastError(error?.message);
        setValidUrl(false);
      }
      console.log("params-2", params);
    })();
  }, [params]);
  return (
    <>
      <div>ConfirmEmailPage</div>
      {validUrl ? (
        <Link to="/main/authorization">Login</Link>
      ) : (
        <h1>404 Not found</h1>
      )}
    </>
  );
};

export default ConfirmEmailPage;
