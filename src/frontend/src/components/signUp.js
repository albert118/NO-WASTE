import React, { Component, createRef } from "react";
import {
    Button,
    FormGroup,
    FormControl,
    ControlLabel,
} from "react-bootstrap";

import { withRouter } from "react-router-dom";

import '../static/css/Signup.css'

class Login extends Component {
    state = {
        username: '',
        password: '',
        confirmPassword: '',
        dob: '',
        loading: false,
        API_HOST: 'http://127.0.0.1:8000',
        _csrfToken: null,
    };

    handleUsernameChange = this.handleUsernameChange.bind(this)
    handlePasswordChange = this.handlePasswordChange.bind(this)
    handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this)
    handleDOBChange = this.handleDOBChange.bind(this)
    handleSubmit = this.handleSubmit.bind(this)

    async componentDidMount() {
        await this.getCsrfToken();
        await this.formGET();
    }


    componentWillUnmount() {
        clearInterval(this.intervalID);
    }


    async getCsrfToken() {
        if (this.state._csrfToken === null) {
            const response = await fetch(`${this.state.API_HOST}/accounts/csrf/`, {
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
            this.state.username.length > 0 &&
            this.state.password.length > 0 &&
            this.state.confirmPassword === this.state.password
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
        });
    }


    handleConfirmPasswordChange(event) {
        this.setState({
            confirmPassword: event.target.value
        });
    }


    handleDOBChange(event) {
        this.setState({
            dob: event.target.value
        });
    }


    async signUpPOST() {
        const form = new FormData();

        const response = await fetch(`${this.state.API_HOST}/accounts/registration/`, {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                'Content-Type': 'Content-Type:application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin': '*',
                'x-csrftoken': this.state._csrfToken,
            },
            body: JSON.stringify({
                "username": this.state.username,
                "password1": this.state.password,
                "password2": this.state.confirmPassword
            }),
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        });

        return response;
    }

    async formGET() {
        const response = await fetch(`${this.state.API_HOST}/accounts/registration/`, {
            method: "GET",
            mode: "cors",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'x-csrftoken': this.state._csrfToken,
            }
        });

        const data = await String(response.text()).replace("\n", '').split("</tr>");

        return data;
    }


    async handleSubmit(event) {
        event.preventDefault();
        this.setState({ loading: true });
        // TODO update these alerts to be more user friendly, especially the errors...
        try {
            // https://docs.djangoproject.com/en/3.1/topics/auth/default/#django.contrib.auth.forms.UserCreationForm
            // param names are same as Django UserCreationForm for clarity.
            await this.signUpPOST();
            alert("You're all signed up! Woohoo!");
            // example of redirect
            // https://gist.github.com/elitan/5e4cab413dc201e0598ee05287ee4338
            this.props.history.push('/login'); // redirect to login page
        } catch (error) {
            alert(error.message);
        }

        this.setState({ loading: false });
    }


    render() {
        return (
            <div className="signup-page-frame Signup">
                <form onSubmit={this.handleSubmit} name="signupForm">
                    <FormGroup controlId="username" bsSize="large">
                        <ControlLabel>Username</ControlLabel>
                        <FormControl
                            autoFocus="username"
                            type="email"
                            value={this.state.username}
                            onChange={this.handleUsernameChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            type="password"
                            value={this.state.password}
                            onChange={this.handlePasswordChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Password Confirm</ControlLabel>
                        <FormControl
                            type="password"
                            value={this.state.handlePasswordChange}
                            onChange={this.handleConfirmPasswordChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Date of Birth DUMMY VAR RN</ControlLabel>
                        <FormControl
                            type="date"
                            value={this.state.dob}
                            onChange={this.handleDOBChange}
                        />
                    </FormGroup>
                    <Button
                        type="submit"
                        block bsSize="large"
                        disabled={
                            !this.validateForm()
                        }
                    >Login</Button>
                </form>
            </div>
        );
    }
}


export default withRouter(Login);