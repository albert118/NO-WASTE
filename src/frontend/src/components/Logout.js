import React, { Component } from 'react';
// I think this works...I honestly don't know how to check until 
// we have a 'auth required' page to attempt to access... I think??

export default class Logout extends Component {
    state = {
        loading: false,
        API_HOST:'http://127.0.0.1:8000',
        _csrfToken: null,
    };

    async componentDidMount() {
        await this.getCsrfToken();
        await this.logOutRequest();
    }

    async logOutRequest() {
        const response = await fetch(`${ this.state.API_HOST }/accounts/logout/`, {
            method: "GET",
            mode: "cors",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Access-Control-Allow-Origin': '*',
                'x-csrftoken': this.state._csrfToken,
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
