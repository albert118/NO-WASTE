// https://dev.to/rafacdomin/creating-floating-label-placeholder-for-input-with-reactjs-4m1f for floating labels
// https://github.com/ihor/react-styled-floating-label git repo for floating labels
import React, { Component } from "react";

import {
    Button,
    FormGroup,
    FormControl,
    ControlLabel,
} from "react-bootstrap";

import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import Logo from '../static/site/img/logonew.svg';

import style from '../static/css/Login.css';

class Login extends Component {
    state = {
        username: 'username@site.com',
        password: 'SECRET! Password1234',
        loading: false,
        API_HOST:'http://localhost:8000',
        _csrfToken: null,
    };

    handleUsernameChange = this.handleUsernameChange.bind(this)
    handlePasswordChange = this.handlePasswordChange.bind(this)
    handleSubmit = this.handleSubmit.bind(this)

    async componentDidMount() {
        // 1/10/2020
        // TL; DR turns out Axios being based on XzMLHttpRequest and Fetch on Request
        // matters in this specific case. XMLHttpRequest doesn't support mode, credentials and crossdomain
        // options. This means we can't get Django Authentication middleware to accept
        // our XMLHttp header token...yikes
        // 2/10/2020
        // Further investigation, after swapping back to fetch,
        // determined that "working" fetch example only did so
        // as it responded to a GET, where Django had set the cookie.
        // loginRequest() wasn't...So tried to make Django do it for the 
        // post() of LoginView(View) and still couldn't. Main issue was
        // Django didn't want to set the cookie in CORS setting (Lax def)
        // setting to NULL solved problem.
        await this.getCsrfToken();
    }

    async loginRequest(credentials) {
        const response = await fetch(`${ this.state.API_HOST }/accounts/login/`, {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Access-Control-Allow-Origin': '*',
                'x-csrftoken': this.state._csrfToken,
                'Authorization': JSON.stringify(credentials),
            },
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        });
        return response;
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    async getCsrfToken() {
        if (this.state._csrfToken === null) {
            const response = await fetch(`${ this.state.API_HOST }/accounts/csrf/`, {
                credentials: 'include',
            });
            const data = await response.json();
            this.setState({ _csrfToken: data.csrfToken });
            return data.csrfToken
        }
    }

    validateForm() {
        // TODO expand this for URs on password validation requirement.
        return (
            this.state.username.length > 0 && this.state.password.length > 0
        );
    }

    handleUsernameChange(event) {
        this.setState({
            username: event.target.value
        })
    }

    handlePasswordChange(event) {
        this.setState({
            password: event.target.value
        })
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({ loading: true });
        // TODO update these alerts to be more user friendly, especially the errors...
        try {
            await this.loginRequest({
                username: this.state.username,
                password: this.state.password
            });
            alert("You're all logged in! Woohoo!");
            // example of redirect
            // https://gist.github.com/elitan/5e4cab413dc201e0598ee05287ee4338
            this.props.history.push('/'); // redirect to main page
        } catch (error) {
            alert(error.message);
        }

        this.setState({ loading: false });
    }

    render() {
        return (
            <div className="login-page-frame Login">
                <header>
                    <div className="big-logo">
                        <img src={Logo} />
                    </div>
                    <h1 className="title">WELCOME</h1>
                </header>
                <form onSubmit={ this.handleSubmit }>
                    <FormGroup controlId="username" bsSize="large">
                        <ControlLabel>USERNAME</ControlLabel>
                        <FormControl
                            autoFocus="username"
                            type="text"
                            value={ this.state.username }
                            onChange={this.handleUsernameChange }
                        />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>PASSWORD</ControlLabel>
                        <FormControl
                            type="password"
                            value={ this.state.password }
                            onChange={this.handlePasswordChange }
                        />
                    </FormGroup>
                    <Button
                        type="submit"
                        block bsSize="large"
                        disabled={
                            !this.validateForm()
                        }
                    >LOGIN</Button>
                </form>
                     <p className="subtext"> Not a member? 
                     <Link to="../signup" className="linktext"> Sign up.</Link>
                     </p>
            </div>
        );
    }
}

export default withRouter(Login);
