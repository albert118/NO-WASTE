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
