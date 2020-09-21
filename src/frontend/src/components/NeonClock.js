import React, { Component } from 'react';
import "../static/css/neon-clock.css";

export default class NeonClock extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            time: new Date(Date.now()).toLocaleTimeString().split(":")
        };
    }

    componentDidMount() {
        this.intervalID = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    tick() {
        this.setState({
            time: new Date(Date.now()).toLocaleTimeString().split(":")
        });
    }

    render() {
        return (   
            <div className="clock-frame">
                <div className="clock-time">
                    <a href="/">{ this.state.time[0] }</a>
                </div>
                <div className="clock-time">
                    <a href="/">:</a>
                </div>
                <div className="clock-time">
                    <a href="/">{ this.state.time[1] }</a>
                </div>
                <div className="clock-time">
                    <a href="/">:</a>
                </div>
                <div className="clock-time">
                    <a href="/">{ this.state.time[2] }</a>
                </div>
            </div>
        )
    }
} 