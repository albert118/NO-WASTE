// error 404 not found 
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom';
import Logo from '../static/site/img/logonew.svg';

// styling
import "../static/css/buttons.css";
import "../static/css/httperror.css";
import { Button } from 'react-bootstrap';


class error404 extends Component {

    render() {
        return (
            <div className="login-page-frame Login">
                <header>
                    <div className="title">
                        <img src={Logo} />
                    </div>
                    <h1 className="title">500 INTERNAL SERVER ERROR</h1>
                </header>
                <p className="subtext">The server could not handle the request at this time.</p>
                <p className="subtext">
                    Please check your last action, if you believe this was a bug, contact us!
                </p>
                <Button href="/" className="btn">Return home.</Button><br></br>
                <Button href="https://github.com/albert118/NO-WASTE/issues" className="btn">REPORT A BUG</Button>
            </div>

        );
    }
}
export default withRouter(error404);