import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

class LoginPage extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    state = {
        loading: false,
        API_HOST:'http://127.0.0.1:8000',
        csrfToken: this.props.cookies.get("csrftoken") || '',
        _csrfToken: null,
    };

    async componentDidMount() {
        // TL;DR turns out Axios being based on XMLHttpRequest and Fetch on Request
        // matters in this specific case. XMLHttpRequest doesn't support mode, credentials and crossdomain
        // options. This means we can't get Django Authentication middleware to accept
        // our XMLHttp header token...yikes
        const auth = {
            username: 'admin',
            password: 'admin'
        };

        await this.getCsrfToken();
        await this.loginRequest(auth);
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
        const { cookies } = this.props;
        if (this.state._csrfToken === null) {
            const response = await fetch(`${ this.state.API_HOST }/accounts/csrf/`, {
                credentials: 'include',
            });
            const data = await response.json();
            this.setState({ _csrfToken: data.csrfToken });             // temp
            cookies.set("csrftoken", data.csrfToken, { path: "/" }); // setting the cookie
            this.setState({ csrftoken: cookies.get("csrftoken") }); // set the state with the cookie
        }
    }

    render() {
        return (
            <div className="login-page-frame">
                <p>Test csrf token: { this.state._csrfToken }</p>
            </div>
        )
    }
}

export default withCookies(LoginPage);