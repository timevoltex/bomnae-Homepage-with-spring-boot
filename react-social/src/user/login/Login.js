import React, { Component, useState, useEffect } from 'react';
import './Login.css';
import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL, GITHUB_AUTH_URL, ACCESS_TOKEN, ADMIN_TOKEN } from '../../constants';
import { login } from '../../util/APIUtils';
import { Link, Redirect, withRouter } from 'react-router-dom'
import fbLogo from '../../img/fb-logo.png';
import googleLogo from '../../img/google-logo.png';
import githubLogo from '../../img/github-logo.png';
import Alert from 'react-s-alert';

function Login(props) {
    useEffect(() => {
        if (props.location.state && props.location.state.error) {
            setTimeout(() => {
                Alert.error(props.location.state.error, {
                    timeout: 5000
                })
                props.history.replace({
                    pathname: props.location.pathname,
                    state: {}
                })
            }, 100)
        }
    })
    if (props.authenticated) {
        return <Redirect
            to={{
                pathname: "/home",
                state: { from: props.location }
            }} />;
    }
    return (
        <div className="login-container">
            <div className="login-content">
                <h1 className="login-title">Login to SpringSocial</h1>
                <SocialLogin />
                <div className="or-separator">
                    <span className="or-text">OR</span>
                </div>
                <LoginForm {...props} />
                <span className="signup-link">New user? <Link to="/signup">Sign up!</Link></span>
            </div>
        </div>
    )
}

function SocialLogin(){
    return (
        <div className="social-login">
            <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
                <img src={googleLogo} alt="Google" /> Log in with Google</a>
            <a className="btn btn-block social-btn facebook" href={FACEBOOK_AUTH_URL}>
                <img src={fbLogo} alt="Facebook" /> Log in with Facebook</a>
            <a className="btn btn-block social-btn github" href={GITHUB_AUTH_URL}>
                <img src={githubLogo} alt="Github" /> Log in with Github</a>
        </div>
    )
}

function LoginForm(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleInputChange = (event) => {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        if (inputName === 'email') {
            setEmail(inputValue);
        } else {
            setPassword(inputValue)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const loginRequest = Object.assign({}, { email, password });

        login(loginRequest)
            .then(response => {
                console.log(response.tokenType)
                localStorage.setItem(ACCESS_TOKEN, `${response.tokenType} ${response.accessToken}`);
                localStorage.setItem(ADMIN_TOKEN, true)
                Alert.success("You're successfully logged in!");
                props.history.push("/")
            }).catch(error => {
                Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
                console.log(error && error.message)
            });
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-item">
                <input type="email" name="email"
                    className="form-control" placeholder="Email"
                    value={email} onChange={handleInputChange} required />
            </div>
            <div className="form-item">
                <input type="password" name="password"
                    className="form-control" placeholder="Password"
                    value={password} onChange={handleInputChange} required />
            </div>
            <div className="form-item">
                <button type="submit" className="btn btn-block btn-primary">Login</button>
            </div>
        </form>
    );
}

export default withRouter(Login)
