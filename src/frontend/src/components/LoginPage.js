import React, { Component } from 'react';
import axios from 'axios';

const API_HOST = 'http://127.0.0.1:8000';
let _csrfToken = null;

export default class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
    }

    async componentDidMount() {
        const config = {
            xsrfCookieName: 'csrftoken',
            xsrfHeaderName: 'X-CSRFTOKEN',
            method: 'post',
            url: `${API_HOST}/accounts/login/`,
            withCredentials: true,
            credentials: 'include',
            auth: {
                username: 'admin',
                password: 'admin'
            },
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'X-CSRFToken': `${ await this.getCsrfToken() };`,
            },
            
        };
        await axios.request(config)
        .then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        });
    }

    async testRequest(method) {
        const response = await fetch(`${API_HOST}/ping/`, {
            method: method,
            headers: (
                method === 'POST'
                    ? { 'X-CSRFToken': await this.getCsrfToken() }
                    : {}
            ),
            credentials: 'include',
        });
        const data = await response.json();
        return data.result;
    }

    async componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    async getCsrfToken() {
        if (_csrfToken === null) {
            const response = await fetch(`${API_HOST}/accounts/csrf/`, {
                credentials: 'include',
            });
            const data = await response.json();
            _csrfToken = data.csrfToken;
        }
        return _csrfToken;
    }

    render() {
        return (
            <div className="login-page-frame">
                {/* <p>Test GET request: {this.state.testGet}</p>
                <p>Test POST request: {this.state.testPost}</p> */}
            </div>
        )
    }
}