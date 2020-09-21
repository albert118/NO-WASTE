import React, { Component } from 'react';
import "../static/css/weather-widget.css";
import axios from 'axios';

export default class WeatherWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weather: this.getWeather().data
        };
    }

    componentDidMount() {
        const updateTimer = 24*60*60;
        this.intervalID = setInterval(() => this.getWeather(), updateTimer);
    }

   componentWillUnmount() {
       clearInterval(this.intervalID);
    }

   getWeather() {
       const apiURL = "http://api.weatherstack.com/current"; // https is pro feature
       const axios = require('axios');
       const params = {
           access_key: "3f673dcfe22919435bf219e1a62b6551",
           query: 'Sydney'
        }
    
        // axios request promise, use "then" to create second promise to return data
        const promise = axios.get(apiURL, { params });
        const apiResponse = promise.then((response) => response.data);
        // return the data
        return apiResponse;
   }

    render() {
        return(
            <div className="widget-frame">  
                <div className="location">
                    <span>{ console.log(this.state) }</span>
                </div>
                <div className="main_left">
                    <i data-api="current_icon" className="full_sun"></i>
                    <span data-api="current_main_desc">Sunny</span>
                </div>
                <div className="main_right">
                    <span data-api="current_temperature">26°c</span>
                </div>
            </div>
        )
    }
}