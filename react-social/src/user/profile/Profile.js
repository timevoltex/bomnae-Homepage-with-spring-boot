import React, { Component } from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';
import { ADMIN_TOKEN } from '../../constants';

function Profile({currentUser}){
    const isAdmin = localStorage.getItem(ADMIN_TOKEN)
        return (
            <div className="profile-container">
                <div className="container">
                    <div className="profile-info">
                        <div className="profile-avatar">
                            { 
                                currentUser.imageUrl ? (
                                    <img src={currentUser.imageUrl} alt={currentUser.name}/>
                                ) : (
                                    <div className="text-avatar">
                                        <span>{currentUser.name && currentUser.name[0]}</span>
                                    </div>
                                )
                            }
                        </div>
                        <div className="profile-name">
                           <h2>{currentUser.name}</h2>
                           <p className="profile-email">{currentUser.email}</p>
                        </div>
                    </div>
                </div>
                {isAdmin ? <Link to ="/admin">관리자 페이지</Link>: null}
            </div>
        );
}

export default Profile