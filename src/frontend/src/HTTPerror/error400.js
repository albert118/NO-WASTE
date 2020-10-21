// 400 bad request 

import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom';
import Logo from '../static/site/img/logonew.svg';
import style from '../static/css/httperror.css';


class error400 extends Component {

    render() {
        return (
            <div className="login-page-frame Login">
                <header>
                    <div className="title">
                        <img src={Logo}/>
                    </div>
                    <h1 className="title">400 BAD REQUEST</h1>
                </header>
                <p className="subtext">Server was unable to process the request sent.</p>
                <p className="subtext">Please navigate to previous page, get good or 
                <Link to=".." className="linktext"> return home.</Link>
                </p>
                
            </div>

        );
    }
}
export default withRouter(error400);