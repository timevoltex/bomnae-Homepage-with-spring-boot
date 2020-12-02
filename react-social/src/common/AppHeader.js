import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import "./AppHeader.css";
import { ADMIN_TOKEN } from "../constants";
import Icon from "../img/bomnaeIcon.jpeg";
import styled from "styled-components";

function AppHeader({
  path,
  authenticated,
  onLogout,
  onAdminLogout,
  currentUser,
}) {
  const mobile = window.innerWidth;
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
        <HeaderContainer
          sign={authenticated ? true : false}
          className="app-header"
        >
          <div className="container">
            <div className="app-branding">
              {mobile > 450 ? (
                <NavLink to="/home" className="app-title">
                  <img src={Icon} style={{ width: "2.5vmin" }} />
                  <span>봄내 온라인 사진전</span>
                </NavLink>
              ) : (
                <NavLink to="/home" className="app-title-mobile">
                  <img
                    src={Icon}
                    style={{ width: 50, height: 50, textAlign: "center" }}
                    alt="profileImage"
                  />
                </NavLink>
              )}
            </div>
            <div className="app-options">
              <nav className="app-nav">
                <ul>
                  <li>
                    <NavLink to="/home">인사말</NavLink>
                  </li>
                  <li>
                    <NavLink to="/gallery">사진전</NavLink>
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
                        {currentUser.imageUrl ? (
                          currentUser.provider === "kakao" ? (
                            <img
                              class="kakao"
                              src={currentUser.imageUrl}
                              alt={currentUser.name}
                            />
                          ) : (
                            <img
                              class="google"
                              src={currentUser.imageUrl}
                              alt={currentUser.name}
                            />
                          )
                        ) : (
                          <span>{currentUser.name && currentUser.name[0]}</span>
                        )}
                        <span> {currentUser.name}</span>
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
        </HeaderContainer>
      );
    }
  }
}

export default AppHeader;

const HeaderContainer = styled.header`
  @media only screen and (max-width: 460px) {
    height: auto;
    .app-branding,
    .app-options {
      float: unset;
    }
    .container {
      text-align: center;
      margin-top: 10px;
    }
  }
  li {
    padding-left: ${(props) => (props.sign ? "8px" : "15px")};
    padding-right: ${(props) => (props.sign ? "8px" : "15px")};
  }
`;
