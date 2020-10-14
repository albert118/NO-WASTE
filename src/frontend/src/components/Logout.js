import React, { Component } from 'react';
import { Button } from "react-bootstrap";

export default class Logout extends Component {
    state = {
        loading: false,
        API_HOST:'http://127.0.0.1:8000',
        _csrfToken: null,
    };

    handleSubmit = this.handleSubmit.bind(this);


    async componentDidMount() {
        await this.getCsrfToken();
    }


    componentWillUnmount() {
        clearInterval(this.intervalID);
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

    
    async handleSubmit(event) {
        event.preventDefault();
        this.setState({ loading: true });
        // TODO update these alerts to be more user friendly, especially the errors...
        try {
            await this.logOutRequest();
            alert("You're logged out! See you soon!");
        } catch (error) {
            alert(error.message);
        }

        this.setState({ loading: false });
    }

    render() {
        return(
            <div className="logout-page-frame Logout">
                <form onSubmit={ this.handleSubmit }>
                    <Button type="submit" block bsSize="large">Logout</Button>
                </form>
            </div>
        );
    }
}
