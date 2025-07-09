import { useRef, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import authService from '../api/authService';
import "./styles/Register.css";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{4,50}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,}$/; 

const Register = () => {
    const userRef = useRef();
    const errorRef = useRef();

    const [user, setUser] = useState('');
    const [isValidName, setIsValidName] = useState(false);
    const [isUserFocus, setIsUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [isValidPwd, setIsValidPwd] = useState(false);
    const [isPwdFocus, setIsPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [isValidMatch, setIsValidMatch] = useState(false);
    const [isMatchFocus, setIsMatchFocus] = useState(false);

    const [errorMsg, setErrorMsg] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const normalizedUsername = user.trim().toLowerCase();

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        const result = USER_REGEX.test(normalizedUsername);
        setIsValidName(result);
    }, [user]);

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setIsValidPwd(result);

        const match = pwd === matchPwd;
        setIsValidMatch(match);
    }, [pwd, matchPwd]);

    useEffect(() => {
        setErrorMsg('');
    }, [user, pwd, matchPwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const v1 = USER_REGEX.test(normalizedUsername);
        const v2 = PWD_REGEX.test(pwd);

        if (!v1 || !v2) {
            setErrorMsg('Invalid Username or Password!');
            return;
        }
        
        try {
            await authService.registerUser({ username: normalizedUsername, password: pwd });

            setIsSuccess(true);
            setUser('');
            setPwd('');
        } catch (error) {
            if (!error?.response) {
                setErrorMsg('No Server Response');
            } else if (error.response?.status === 409) {
                setErrorMsg('This username already exist.');
            } else {
                setErrorMsg('Registration failed');
            }
            errorRef.current.focus();
        }
    };

    return (
        <>
            {isSuccess ? (
                <div className="success-container">
                    <h1>You registered successfully!</h1>
                    <p>
                        <Link to="/Login">Sign In</Link>
                    </p>
                </div>
            ) : (
                <div className="register-container">
                    <p ref={errorRef} className={errorMsg ? "error-msg" : "offscreen"} aria-live="assertive">{errorMsg}</p>
                    <h1>Register</h1>
                    <form className="register-form" onSubmit={handleSubmit}>
                        <label htmlFor="username">
                            Username:
                            <span className={isValidName ? "valid" : "hide"}>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span className={isValidName || !user ? "hide" : "invalid"}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>

                        </label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            required
                            aria-invalid={isValidName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setIsUserFocus(true)}
                            onBlur={() => setIsUserFocus(false)}
                        />
                        <p id="uidnote" className={isUserFocus && user && !isValidName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            5 to 50 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>

                        <label htmlFor="password">
                            Password:
                            <span className={isValidPwd ? "valid" : "hide"}>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span className={isValidPwd || !pwd ? "hide" : "invalid"}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            required
                            aria-invalid={isValidPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setIsPwdFocus(true)}
                            onBlur={() => setIsPwdFocus(false)}
                        />
                        <p id="pwdnote" className={isPwdFocus && !isValidPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Minimum 8 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span>
                            <span aria-label="at symbol">@</span><span aria-label="hashtag">#</span>
                            <span aria-label="dollar sign">$</span><span aria-label="percent">%</span>
                        </p>

                        <label htmlFor="confirm_pwd">
                            Confirm Password:
                            <span className={isValidMatch && matchPwd ? "valid" : "hide"}>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span className={isValidMatch || !matchPwd ? "hide" : "invalid"}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            required
                            aria-invalid={isValidMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setIsMatchFocus(true)}
                            onBlur={() => setIsMatchFocus(false)}
                        />
                        <p id="confirmnote" className={isMatchFocus && !isValidMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>

                        <button className="btn-sign-up" disabled={!isValidName || !isValidPwd || !isValidMatch ? true : false}>Sign Up</button>
                    </form>
                    <p>
                        Already registered?<br />
                        <span className="line">
                            <Link to="/Login">Sign In</Link>
                        </span>
                    </p>
                </div>
            )}
        </>
    );
};

export default Register;