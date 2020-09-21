import React, { Component } from 'react';
import "../static/css/weather-widget.css";

export default class WeatherWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            location: {},
            current: {},
            icons: []
        };
    }

    async componentDidMount() {
        const apiURL = "http://api.weatherstack.com/current"; // https is pro feature
        const axios = require('axios');
        const params = {
            access_key: "606d911837a526ee18d20de9a0ae6872",
            query: 'Sydney'
        }
    
        try {
            // axios request promise, use "then" to create second promise to return data
            await axios.get(apiURL, { params })
                .then(response => {
                    console.log("WeatherStack API returned valid response.");
                    const weather = response.data;
                    this.setState({ 
                        loading: false,
                        location: weather.location,
                        current: weather.current,
                        icons: weather.current.weather_icons
                     });
            });
        } catch(error) {
            console.log(error);
        }
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    render() {
        const { loading, location, current, icons } = this.state;
        const isLoading = "loading...";

        return(
            <div className="widget-frame">  
                <div className="location">
                    <span> { 
                        loading ? isLoading:
                        location.name + ', ' + location.region + ', ' + location.country
                    }
                    </span>
                </div>
                <div className="main-left">
                    <span className="current-icon">{ loading ? isLoading: <img src={String(icons) }/>}</span>
                    <span className="descriptions">{ loading ? isLoading: current.weather_descriptions }</span>
                </div>
                <div className="divider"/>
                <div className="main-right">
                    <span className="humidity">{ loading ? isLoading: current.humidity }</span>
                    <span className="precipitation">{ loading ? isLoading: current.precip }</span>
                    <span className="temperature">{ loading ? isLoading: current.temperature +'°c' }</span>
                </div>
            </div>
        )
    }
}