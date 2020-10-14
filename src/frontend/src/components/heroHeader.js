import React, { Component } from 'react';
import NeonClock from './NeonClock';
import WeatherWidget from './WeatherWidget';
import SettingsButton from './SettingsButton';
import "../static/css/heroHeader.css";

export class HeroHeader extends Component {
    render() {
        return (
            <div className="hero-header-box hero-header-text">
                <div className="hero-header-grid">
                    <div className="hero-header-item clock">
                        <NeonClock />
                    </div>
                    <div className="hero-header-item weather">
                        <WeatherWidget />
                    </div>
                    <div className="hero-header-item settings">
                        <SettingsButton />
                    </div>
                </div>
            </div>
        )
    }
}
