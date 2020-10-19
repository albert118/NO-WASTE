import React, { Component } from 'react';

export class Footer extends Component {
    render() {
        return(
            <footer className="footer-grid footer-text">
                <div className="authorMsg grid-item">
                    Built with{ ' ' }
                    <span role="img" aria-label="love">
                        💚
                    </span>
                    { ' ' } by Albert Ferguson
                </div>
                <div className="footer-contact-banner grid-item">
                    Connect with us on
                    <a href="www.facebook.com"><i className="fa fa-facebook"></i> Facebook</a>
                    { ' ' }or{ ' ' }
                    <a href="www.twitter.com"><i className="fa fa-twitter"></i> Twitter</a>
                </div>
                <div className="legal grid-item">
                    &copy; No-Waste 2020
                </div>
            </footer>
        )
    }
}

export class Header extends Component {
    render() {
        return (
            <div>
                <p>NO HEADER</p>
            </div>
        )
    }
}


function APIError(message, data, status) {
    /* API Error wrapper. Attempts to parse the response
     * gracefully. Stringify's the result if successful or not!
     */
    let response = null;
    let isObject = false;

    // attempt to parse a response...
    try {
        response = JSON.parse(data);
        isObject = true;
    } catch (error) {
        response = data;
    }

    this.response = response;
    this.message = message;
    this.status = status;
    this.toString = function () {
        return (
            `${this.message}\nResponse:\n${
            isObject ? JSON.stringify(this.response, null, 2) : this.response
            }`
        );
    };
}

export const fetchResource = (path, userOptions = {}) => {

    async function getCsrfToken(APIRootPath) {
        const response = await fetch(`${APIRootPath}/accounts/csrf/`, {
            credentials: 'include',
        });
        const data = await response.json();
        return data.csrfToken
    }

    // standard HTTP errors to check for
    const HttpUnauthorised = 401;
    const HttpNotFound = 404;
    const HttpBadRequest = 400;

    // API source to request from, root url
    const APIRootPath = "http://localhost:8000";
    // build the query's url...
    const url = `${APIRootPath}/${path}`;
    

    // data added after method check
    let defaultOptions = {};
    let defaultHeaders = {};

    if ("method" in userOptions) {
        if (userOptions["method"] === "POST") {
            // default query options for the backend PAPI.
            defaultOptions = {
                mode: "cors",
                credentials: "include",
            };

            defaultHeaders = {
                'Content-Type': 'application/json;charset=utf-8',
                'Access-Control-Allow-Origin': '*',
                // CSRF Token for backend requests...helper fetch function grabs it.
                'x-csrftoken': getCsrfToken(APIRootPath),
            };
        } else {
            // default query options for the backend PAPI.
            defaultOptions = {
                credentials: "include",
            };

            defaultHeaders = {
                'Content-Type': 'application/json;charset=utf-8',
            };
        }
    } else {
        throw new APIError(
            `Request failed. No method set!!`,
            null,
            "NO METHOD SET."
        );
    }
    

    const options = {
        // union-combine the options,
        ...defaultOptions,
        ...userOptions,
        // union-combine header options,
        headers: {
            ...defaultHeaders,
            ...userOptions.headers,
        },
    };

    // stringify the data to upload...
    if (options.boday && typeof options.body === 'object') {
        options.body = JSON.stringify(options.body);
    }

    let response = null;
    
    return fetch(url, options)
        .then(responseObject => {
            response = responseObject;

            // TODO: ADD REDIRECTS HERE TO ALICE's PAGES.
            if (response.status === HttpBadRequest) {
                console.log(`Unauthorised request with options:${options}`);
            } else if (response.status === HttpNotFound) {
                console.log(`Resource at: ${path} not found: 404`);
            } else if (response.status === HttpUnauthorised) {
                console.log(`Unauthorised request for resource at ${path}!\nThis has been logged.`);
                // TODO: add redirect to login page.
            } else if (response.status < 200 || response.status >= 300) {
                // return the response message as text
                return response.text();
            }
            // return the json response
            return response.json();
                
        }).then(parsedResponse => {
            if (response.status < 200 || response.status >= 300) {
                // throw the error if we get here.
                throw parsedResponse;
            }

            // success!!
            return parsedResponse;
        }).catch(error => {
            // utilise the custom API error function here.
            // response doesnt exist unless an HTTP error has occured.
            if (response) {
                throw new APIError(
                    `Request failed with status ${response.status}.`,
                    error,
                    response.data
                );
            } else {
                throw new APIError(error.toString(), null, "REQUEST FAILED TREMENDOUSLY");
            }
        });
}