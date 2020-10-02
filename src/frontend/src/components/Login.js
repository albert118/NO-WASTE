import React, { Component } from 'react';

export default class Login extends Component {
    state = {
        loading: false,
        API_HOST:'http://127.0.0.1:8000',
        _csrfToken: null,
    };

    async componentDidMount() {
        // 1/10/2020
        // TL; DR turns out Axios being based on XMLHttpRequest and Fetch on Request
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
        if (this.state._csrfToken === null) {
            const response = await fetch(`${ this.state.API_HOST }/accounts/csrf/`, {
                credentials: 'include',
            });
            const data = await response.json();
            this.setState({ _csrfToken: data.csrfToken });
            return data.csrfToken
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
