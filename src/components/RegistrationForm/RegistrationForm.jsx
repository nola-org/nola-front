import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import css from "./RegistrationForm.module.css";
import Button from "../Button";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import * as yup from "yup";
import { ToastContainer } from "react-toastify";
import { ToastError } from "../../services/ToastError/ToastError";
import { useDispatch } from "react-redux";
import { registerThunk } from "../../redux/auth/authThunk";
import { Toastify } from "../../services/Toastify/Toastify";
import error from "../../assets/icons/circle-exclamation-mark.svg";
import { Modal } from "../Modal/Modal";

const schema = yup.object().shape({
  email: yup
    .string()
    // .matches(
    //   /^[a-zA-Z0-9._%+-]+@(gmail\.com|ukr\.net|meta\.ua)$/,
    //   "Please enter valid characters"
    // )
    .matches(/^[^\s]*$/, "Please enter valid characters")
    .matches(/^[^а-яА-ЯіІїЇєЄ]*$/, "Please enter valid characters")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(RegExp('[!@#$%^&*(),.?":{}|<>+=-]'), "Special symbols is required")
    .matches(/^(?=.*[a-z])/, " Must Contain One Lowercase Character")
    .matches(/^(?=.*[A-Z])/, "  Must Contain One Uppercase Character")
    .min(8, "Password must be at least 8 characters")
    .max(16, "The password must be no more than 16 characters."),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .matches(RegExp('[!@#$%^&*(),.?":{}|<>+=-]'), "Special symbols is required")
    .matches(/^(?=.*[a-z])/, " Must Contain One Lowercase Character")
    .matches(/^(?=.*[A-Z])/, "  Must Contain One Uppercase Character")
    .min(8, "Confirm Password must be at least 8 characters")
    .max(16, "The password must be no more than 16 characters.")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  userName: yup.string().required("Name is required"),
});

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModal, setIsModal] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    userName: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [validForm, setValidForm] = useState(false);

  useEffect(() => {}, [errors]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  useEffect(() => {
    if (
      formData.confirmPassword === formData.password &&
      errors?.email?.length === 0 &&
      errors?.password?.length === 0 &&
      errors?.confirmPassword?.length === 0 &&
      errors?.userName?.length === 0
    ) {
      setValidForm(true);
      return;
    } else {
      setValidForm(false);
    }
  }, [
    errors?.confirmPassword?.length,
    errors?.email?.length,
    errors?.userName?.length,
    errors?.password?.length,
    formData.confirmPassword,
    formData.password,
  ]);

  const handleTogglePassword = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else if (field === "confirmPassword") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleBlur = async (field) => {
    try {
      await schema.validateAt(field, formData);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: "",
      }));
    } catch (validationError) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: validationError.message,
      }));
      setValidForm(false);
    }
  };

  const getBorderColor = (field) => {
    return errors[field] && "#da2e2e";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    schema
      .validate(formData, { abortEarly: false })
      .then(async () => {
        console.log("Form submitted with data:", formData);

        try {
          await dispatch(registerThunk(formData)).unwrap();
          setIsModal(true);
          // Toastify("Registration sucsessfull");
          // navigate("/main/accountAdverticer/adverticerEdit");
        } catch (error) {
          ToastError(error);
        }
        setFormData({
          email: "",
          password: "",
          confirmPassword: "",
          userName: "",
        });
        setErrors({});
        setValidForm(false);
      })
      .catch((validationErrors) => {
        const errorsMap = {};
        validationErrors.inner.forEach((error) => {
          errorsMap[error.path] = error.message;
        });
        setErrors(errorsMap);
      });
  };

  const handleToggleModal = () => {
    setIsModal((prev) => !prev);
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div className={css.inputContainer}>
          {errors.email && <div className={css.errorText}>{errors.email}</div>}
          <input
            className={`${css.inputForm}  ${
              errors?.email?.length === 0 ? css.active : ""
            }
            ${errors?.email?.length > 0 ? css.errorPlaceholder : ""}
             dark:bg-black dark:border-white dark:text-white`}
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            onBlur={() => handleBlur("email")}
            style={{
              borderColor: getBorderColor("email"),
              color: getBorderColor("email"),
            }}
          />

          {errors?.email?.length > 1 ? (
            <img src={error} alt="" className={css.img_error} />
          ) : (
            ""
          )}
        </div>

        <div className={css.inputContainer}>
          {errors.password && (
            <div className={css.errorText}>{errors.password}</div>
          )}
          <div className={css.passwordInputContainer}>
            <input
              className={`${css.inputForm} ${css.passwordInput}  ${
                errors?.password?.length === 0 ? css.active : ""
              }
              ${errors?.password?.length > 0 ? css.errorPlaceholder : ""}
               dark:bg-black dark:border-white dark:text-white`}
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              onBlur={() => handleBlur("password")}
              style={{
                borderColor: getBorderColor("password"),
                color: getBorderColor("password"),
              }}
            />

            <div
              className={`${css.eyeIcon} ${
                errors?.password?.length > 1 ? css.error : ""
              }`}
              onClick={() => handleTogglePassword("password")}
            >
              {!showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
        </div>

        <div className={css.inputContainer}>
          {errors.confirmPassword && (
            <div className={css.errorText}>{errors.confirmPassword}</div>
          )}
          <div className={css.passwordInputContainer}>
            <input
              className={`${css.inputForm} ${css.passwordInput}  ${
                errors?.confirmPassword?.length === 0 ? css.active : ""
              }
              ${errors?.confirmPassword?.length > 0 ? css.errorPlaceholder : ""}
              dark:bg-black dark:border-white dark:text-white`}
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              onBlur={() => handleBlur("confirmPassword")}
              style={{
                borderColor: getBorderColor("confirmPassword"),
                color: getBorderColor("confirmPassword"),
              }}
            />

            <div
              className={`${css.eyeIcon} ${
                errors?.confirmPassword?.length > 1 ? css.error : ""
              }`}
              onClick={() => handleTogglePassword("confirmPassword")}
            >
              {!showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
        </div>

        <div className={css.inputContainer}>
          {errors.userName && (
            <div className={css.errorText}>{errors.userName}</div>
          )}
          <input
            className={`${css.inputForm}  ${
              errors?.userName?.length === 0 ? css.active : ""
            }
              ${
                errors?.userName?.length > 0 ? css.errorPlaceholder : ""
              }           
              dark:bg-black dark:border-white dark:text-white`}
            type="text"
            name="userName"
            placeholder="Name"
            value={formData.userName}
            onChange={handleInputChange}
            onBlur={() => handleBlur("userName")}
            style={{
              borderColor: getBorderColor("userName"),
              color: getBorderColor("userName"),
            }}
          />

          {errors?.userName?.length > 1 ? (
            <img src={error} alt="" className={css.img_error} />
          ) : (
            ""
          )}
        </div>

        <p className={css.textInfo}>
          *By clicking the Register button, I agree to the
          <NavLink to="/main/setting/policyAndPrivecy">
            <span className={css.spanPolicy}>Privacy Policy</span>
          </NavLink>
          and give my consent to data processing
        </p>
        <div className={`${css.btn_text} ${validForm ? css.btn_valid : ""}`}>
          <Button
            label="Register"
            type="submit"
            disabled={validForm ? false : true}
          />
        </div>
      </form>

      {isModal && (
        <Modal childrenEl="true" handleToggleModal={handleToggleModal}>
          <p>
            Registration is complete!
            <br /> Check your e-mail
          </p>
        </Modal>
      )}
    </>
  );
};

export default RegistrationForm;
