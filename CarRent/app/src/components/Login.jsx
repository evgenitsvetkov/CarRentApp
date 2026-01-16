import { useRef, useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useAuthService from '../hooks/useAuthService';
import './styles/Login.css';

const Login = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const userRef = useRef();
    const errorRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const authApi = useAuthService();

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrorMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            var response = await authApi.loginUser({ username: user, password: pwd });

            const accessToken = response?.accessToken;
            const refreshToken = response?.refreshToken;

            setAuth({ user, pwd, accessToken, refreshToken });
            setUser('');
            setPwd('');
            navigate(from, { replace: true });
        } catch (error) {
            if (!error?.response) {
                setErrorMsg('No Server Response.');
            } else if (error.response?.status === 400) {
                setErrorMsg('Wrong Username or Password!');
            } else if (error.response?.status === 401) {
                setErrorMsg('You are unauthorized.');
            } else {
                setErrorMsg('Login failed.');
            }
            errorRef.current.focus();
        }
    };

    return (
        <div className="login-container">
            <p ref={errorRef} className={errorMsg ? "error-msg" : "offscreen"} aria-live="assertive">{errorMsg}</p>
            <h1 className="login-title">Login</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
                <button type="submit" className="btn-sign-in" disabled={!user || !pwd ? true : false}>Sign In</button>
            </form>
            <p>
                Need an Account?<br />
                <span className="line">
                    <Link to="/Register">Sign Up</Link>
                </span>
            </p>
        </div>
    );
};

export default Login;