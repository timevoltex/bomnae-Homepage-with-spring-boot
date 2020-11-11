import React, {  Fragment, useState } from 'react';
import {  NavLink, Link } from 'react-router-dom';
import './AppHeader.css';
import { Typography, Popover } from '@material-ui/core';

function AppHeader({ path, authenticated, onLogout }) {
    const [isActive, setIsActive] = useState(null);
    const openMenu = (event) => {
        setIsActive(event.currentTarget)
    }

    const closeMenu = () => {
        setIsActive(null)
    }

    const open = Boolean(isActive)
    if(path == '/admin' || path == '/list'){
        return(
            <header className="app-header">
                <div className="container main">
                    <div className="app-branding">
                        <p className="app-title">관리자 짱짱맨</p>
                    </div>
                    <div className="app-options">
                        <Link to="/admin">업로드</Link>
                        <Link to="/list">리스트</Link>
                    </div>
                </div>
            </header>
        )
    }else{

        if (path == "/") {
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
        )
    }
    else {
        return (
            <header className="app-header">
                <div className="container">
                    <div className="app-branding">
                        <NavLink to="/" className="app-title">Spring Social</NavLink>
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
                                    <Typography
                                        aria-owns={open ? 'mouse-over-popover' : undefined}
                                        aria-haspopup="true"
                                        onMouseEnter={openMenu}
                                        >
                                        신인전
                                    </Typography>
                                    <Popover
                                        id="mouse-over-popover"
                                        open={open}
                                        anchorEl={isActive}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'center',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'center',
                                        }}
                                        onClose={closeMenu}
                                        disableRestoreFocus
                                        >
                                        <nav className="app-nav" onMouseLeave={closeMenu}>
                                            <ul>
                                                <li>
                                                    <NavLink to="/fresh/subject" onClick={closeMenu}>주제전</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/fresh/free" onClick={closeMenu}>자유전</NavLink>
                                                </li>
                                            </ul>
                                        </nav>
                                    </Popover>
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
                                            <li><NavLink to="/logout" onClick={onLogout}>로그아웃</NavLink></li>
                                        </Fragment>
                                    )}
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
        )
    }
}
}

export default AppHeader;