import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import "./AppHeader.css";
import { ADMIN_TOKEN } from "../constants";

function AppHeader({ path, authenticated, onLogout, onAdminLogout }) {
  const isAdmin = localStorage.getItem(ADMIN_TOKEN);
  if (isAdmin === "true") {
    return (
      <header className="app-header">
        <div className="container main">
          <div className="app-branding">
            <p className="app-title">관리자 짱짱맨</p>
          </div>
          <div className="app-options">
            <nav className="app-nav">
              <ul>
                <li>
                  <NavLink to="/admin">업로드</NavLink>
                </li>
                <li>
                  <NavLink to="/admin/list">리스트</NavLink>
                </li>
                <li>
                  <NavLink to="/admin/signOut" onClick={onAdminLogout}>
                    관리자 로그아웃
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    );
  } else {
    if (path === "/") {
      return (
        <header className="app-header">
          <div className="container main">
            <div className="app-branding">
              <p className="app-title">Bomnae Gallery</p>
            </div>
            <div className="app-options">
              <p>봄내 사진 예술 연구회</p>
            </div>
          </div>
        </header>
      );
    } else {
      return (
        <header className="app-header">
          <div className="container">
            <div className="app-branding">
              <NavLink to="/" className="app-title">
                봄내 온라인 사진전
              </NavLink>
            </div>
            <div className="app-options">
              <nav className="app-nav">
                <ul>
                  <li>
                    <NavLink to="/home">인사말</NavLink>
                    {/* <NavLink to="/profile">Profile</NavLink> */}
                  </li>
                  <li>
                    <NavLink to="/regular">정기전</NavLink>
                  </li>
                  <li>
                    <NavLink to="/fresh">신인전</NavLink>
                  </li>
                  <li>
                    <NavLink to="/graduate">졸업전</NavLink>
                  </li>
                  <li>
                    <NavLink to="/guestbook">방명록</NavLink>
                  </li>
                  {!authenticated ? (
                    <Fragment>
                      <li>
                        <NavLink to="/login">로그인</NavLink>
                      </li>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <li>
                        <NavLink to="/profile">마이페이지</NavLink>
                        {/* <NavLink to="/signup">Signup</NavLink> */}
                      </li>
                      <li>
                        <NavLink to="/logout" onClick={onLogout}>
                          로그아웃
                        </NavLink>
                      </li>
                    </Fragment>
                  )}
                </ul>
              </nav>
            </div>
          </div>
        </header>
      );
    }
  }
}

export default AppHeader;
