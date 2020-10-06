import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
  } from "react-router-dom";
import {About, Admin, Home } from './djangoPages'
import NeonClock from './NeonClock';
import WeatherWidget from './WeatherWidget';
// import SettingsButton from './SettingsButton';

export class WidgetHeader extends Component {
    render() {
        return(
            <div className="App-header-box App-header-text">
                <div className="container">
                    <div className="App-header-hero-item">
                        <NeonClock/>
                    </div>
                    <div className="App-header-hero-item">
                        {/* <WeatherWidget/> */}
                    </div>
                </div>
            </div>
        )
    }
}

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

export class Buttons extends Component {
    render() {
        return(
            <div className="btn-grid">
                <button className="btnRecipes btn">
                    <img src="./static/site/img/recipes/1.png" alt="recipes view"/>
                </button>
                <button className="btnPantry btn">
                    <img src="./static/site/img/pantry/1.png" alt="pantry view"/>
                </button>
                <button className="btnHealth btn">
                    <img src="./static/site/img/health/1.png" alt="health view"/>
                </button>
            </div>
        )
    }
}

export class LinkingDemo extends Component {
    render() {
        return(
            <div className="container">
                <Router>
                    <Switch>
                        <Route exact path="/admin">
                            <Admin />
                        </Route>
                        <Route exact path="/about">
                            <About />
                        </Route>
                        <Route exact path="">
                            <Home />
                        </Route>
                    </Switch>
                </Router>
            </div>
        )
    }
}