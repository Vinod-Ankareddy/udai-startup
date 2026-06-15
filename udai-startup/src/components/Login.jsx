import { useState, useRef, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { 
    loginContainer, loginTitle, loginSubTitle, loginTitleAndSubTiitle,
    loginLabel, emailField, passwordField, loginBtn, loginWithOtpBtn
} from "../assets/styles/tailwind-default";
import getLogin from "../api/getLogin";

import { useDispatch } from "react-redux";
import { addItem } from '../redux-store/userSlice';

const Login = () => {
    const langCode = "en";
    const LocalStrings = require(`../localStrings/${langCode}`);

    const navigate = useNavigate();

    const userDetails = JSON.parse(localStorage.getItem('userDetails'));

    const [values, setValues] = useState({
        email: "",
        password: ""
    });

    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("false");

    const emailRef = useRef(null);
    const emailFeedbackRef = useRef(null);

    const passwordRef = useRef(null);
    const passwordFeedbackRef = useRef(null);

    const dispatch = useDispatch();

    let makeValid = (inputEl, inputFeedbackEl) => {
        inputEl.current.classList.add("border-green-400");
        inputEl.current.classList.remove("border-red-400");
        inputFeedbackEl.current.classList.add("text-green-400");
        inputFeedbackEl.current.classList.remove("text-red-400");
        inputFeedbackEl.current.innerText = "Valid Input";
    }

    let makeInValid = (inputEl, inputFeedbackEl) => {
        inputEl.current.classList.remove("border-green-400");
        inputEl.current.classList.add("border-red-400");
        inputFeedbackEl.current.classList.remove("text-green-400");
        inputFeedbackEl.current.classList.add("text-red-400");
        inputFeedbackEl.current.innerText = `Please Enter a ${inputEl.current.placeholder}`;
    }

    const checkEmail = () => {
        let inputEl = emailRef;
        let inputFeedbackEl = emailFeedbackRef;
        let regExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (regExp.test(inputEl.current.value)) {
            setEmailId(inputEl.current.value)
            makeValid(inputEl, inputFeedbackEl);
            return true;
        } else {
            makeInValid(inputEl, inputFeedbackEl);
            return false;
        }
    }

    const checkPassword = () => {
        let inputEl = passwordRef;
        let inputFeedbackEl = passwordFeedbackRef;
        let regExp = /^[0-9]{8}$/; // /^[A-Za-z0-9]\w{7,14}$/
        if (regExp.test(inputEl.current.value)) {
            setPassword(inputEl.current.value);
            makeValid(inputEl, inputFeedbackEl);
            return true;
        } else {
            makeInValid(inputEl, inputFeedbackEl);
            return false;
        }
    }

    const handleManage = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });

        if (e.target.name === "email") checkEmail();
        if (e.target.name === "password") checkPassword();
    }

    const handleBlur = (e) => {
        handleManage(e);
    }

    const validateForm = () => {
        return (
            checkEmail() & checkPassword()
        )
    }

    const validateFormFields = () => {
        if (validateForm()) {
            setError(false);
            setErrorMsg("");
            const response = getLogin(values);
            setTimeout(() => {
                if (response.validUser === false) {
                    setError(true);
                    setErrorMsg("Email or Password is in correct");
                } else {
                    dispatch(addItem(response));
                    localStorage.setItem("userDetails", JSON.stringify(response));
                    setError(false);
                    setErrorMsg("");
                    navigate("/dashboard");
                }
            }, 1000);

        } else {
            console.error("Something wrong");
            setError(true);
            setErrorMsg("Enter valid E-Mail and Password");
        }
    }

    const loginInForm = (e) => {
        e.preventDefault();
        validateFormFields();
    };

    useEffect(() => {
        if (userDetails) {
            dispatch(addItem(userDetails));
            navigate("/dashboard");
        }
    }, []);

    if (userDetails) return true;

    return (
        <div className={loginContainer}>
              <div className={loginTitleAndSubTiitle}>
                <h2 className={loginTitle}>{LocalStrings.loginTitle}</h2>
                <h4 className={loginSubTitle}>{LocalStrings.loginSubTitle}</h4>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6">
                    <div className="formGroup">
                        <label className={loginLabel}>{LocalStrings.email}</label>
                        <div className="mt-2">
                            <input 
                                type="email" 
                                placeholder="Email"
                                name="email"
                                ref={emailRef}
                                onBlur={handleBlur}
                                className={emailField} 
                            />
                        </div>
                        <div ref={emailFeedbackRef} className="field-feedback"></div>
                    </div>

                    <div className="formGroup">
                        <label className={loginLabel}>{LocalStrings.password}</label>
                        <div className="mt-2">
                            <input 
                                type="password" 
                                placeholder="Password"
                                name="password"
                                ref={passwordRef}
                                onBlur={handleBlur}
                                className={passwordField}
                            />
                        </div>
                        <div ref={passwordFeedbackRef} className="field-feedback"></div>
                    </div>

                    <div className="formBtnGroup">
                        <button type="submit" className={loginBtn} onClick={loginInForm} >{LocalStrings.login}</button>
                    </div>

                    {error && (<div className="text-red-400 text-center">{errorMsg}</div>)}
                </form>

                <p className="mt-10 text-center text-sm/6 text-gray-400">
                    <Link to="/otpLogin" href="#" className={loginWithOtpBtn}>{LocalStrings.loginWithOtp}</Link>
                </p>
                
            </div>
        </div>
    )
}

export default Login;