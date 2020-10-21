// error 404 not found 
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom';
import Logo from '../static/site/img/logonew.svg';
import style from '../static/css/httperror.css';


class error404 extends Component {

    render() {
        return (
            <div className="login-page-frame Login">
                <header>
                    <div className="title">
                        <img src={Logo}/>
                    </div>
                    <h1 className="title">404 NOT FOUND</h1>
                </header>
                <p className="subtext">The page you are trying to view is not found.</p>
                <p className="subtext">Please navigate to previous page, file a missing person's report or 
                <Link to=".." className="linktext"> return home.</Link>
                </p>
                
            </div>

        );
    }
}
export default withRouter(error404);