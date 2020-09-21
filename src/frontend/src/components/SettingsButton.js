import React, { Component } from 'react';
import "../static/css/settings-button.css";
import "../static/css/App.css";


export default class SettingsButton extends Component {

    render() {
        return(
            <div className="settings-btn-frame" style={{justifyContent: "right"}}>
                <button className="settings-btn btn">
                    <img className="App-logo" src="./static/site/img/logo_alt.png"></img>
                </button>
            </div>
        )
    }
}