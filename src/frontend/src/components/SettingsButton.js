import React, { Component } from 'react';
import "../static/css/settingsButton.css";


export default class SettingsButton extends Component {

    render() {
        return(
            <div className="settings-btn-frame" style={{justifyContent: "right"}}>
                <button className="settings-btn btn">
                    <img src="./static/site/img/settings.png"></img>
                </button>
            </div>
        )
    }
}