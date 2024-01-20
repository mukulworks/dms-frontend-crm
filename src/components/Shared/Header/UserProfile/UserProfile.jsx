import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux'
import india from '../../../../images/india.svg';
import { unathenticateToLogOut } from '../../../../actions/authenticationActions'

const UserProfile = ({ userName }) =>{
    const history = useHistory();
    const dispatch = useDispatch()
    const logOutUser = () => {
        dispatch(unathenticateToLogOut())
        localStorage.clear();
        history.push('/');
    }
    
    return(
        <li className="nav-item mr-0 toggle-menu">
            <a className="nav-link dropdown-toggle text-uppercase pr-0" href="#" id="dropdownId" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {userName}
            </a>
            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownId">
                <a className="dropdown-item" href="#" onClick={logOutUser}>Log Out</a>
            </div>
        </li>
    )
}
export default UserProfile;