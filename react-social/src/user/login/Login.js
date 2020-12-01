import React, { useState, useEffect } from "react";
import "./Login.css";
import {
  GOOGLE_AUTH_URL,
  ACCESS_TOKEN,
  ADMIN_TOKEN,
  KAKAO_AUTH_URL,
} from "../../constants";
import { login } from "../../util/APIUtils";
import { Redirect, withRouter } from "react-router-dom";
import googleLogo from "../../img/google-logo.png";
import kakaoLogin from "../../img/kakao_login.png";
import Alert from "react-s-alert";

function Login(props) {
  useEffect(() => {
    if (props.location.state && props.location.state.error) {
      setTimeout(() => {
        Alert.error(props.location.state.error, {
          timeout: 5000,
        });
        props.history.replace({
          pathname: props.location.pathname,
          state: {},
        });
      }, 100);
    }
  });
  if (props.authenticated) {
    return (
      <Redirect
        to={{
          pathname: "/home",
          state: { from: props.location },
        }}
      />
    );
  }
  return (
    <div className="login-container">
      <div className="login-content">
        <h1 className="login-title">봄내 온라인 사진전 로그인 </h1>
        <SocialLogin />
        <div className="or-separator">
          <span className="or-text">OR</span>
        </div>
        <LoginForm {...props} />
      </div>
    </div>
  );
}

function SocialLogin() {
  return (
    <div className="social-login">
      <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
        <img src={googleLogo} alt="Google" /> Log in with Google
      </a>
      <a className="btn btn-block social-btn github" href={KAKAO_AUTH_URL} style={{backgroundImage: `url(${kakaoLogin})`}} >
      </a>
    </div>
  );
}

function LoginForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleInputChange = (event) => {
    const target = event.target;
    const inputName = target.name;
    const inputValue = target.value;

    if (inputName === "email") {
      setEmail(inputValue);
    } else {
      setPassword(inputValue);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const loginRequest = Object.assign({}, { email, password });

    login(loginRequest)
      .then((response) => {
        localStorage.setItem(
          ACCESS_TOKEN,
          `${response.tokenType} ${response.accessToken}`
        );
        localStorage.setItem(ADMIN_TOKEN, true);
        Alert.success("You're successfully logged in!");
        props.history.push("/admin");
      })
      .catch((error) => {
        alert("관리자용입니다. 소셜로그인을 이용해주세요.");
        console.log(error && error.message);
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-item">
        <input
          type="email"
          name="email"
          className="form-control"
          placeholder="Email"
          value={email}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-item">
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-item">
        <button type="submit" className="btn btn-block btn-primary">
          Login
        </button>
      </div>
    </form>
  );
}

export default withRouter(Login);
