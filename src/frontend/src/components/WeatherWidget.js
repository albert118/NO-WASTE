import React, { Component } from 'react';
import "../static/css/weather-widget.css";

export default class WeatherWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: {},
            current: {}
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
                        location: response.data.location,
                        current: response.data.current
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
        return(
            <div className="widget-frame">  
                <div className="location">
                    <span> { 
                        JSON.stringify(this.state.location.name) + ', ' +
                        JSON.stringify(this.state.location.region) + ', ' +
                        JSON.stringify(this.state.location.country) 
                    }
                    </span>
                </div>
                <div className="main_left">
                    <span className="desc">{ 
                        JSON.stringify(this.state.current.weather_descriptions)
                    }
                    </span>
                </div>
                <div className="main_right">
                    <span className="temp">{ 
                        JSON.stringify(this.state.current.temperature)+'°c'
                    }
                    </span>
                    <span className="humidity">{ 
                        JSON.stringify(this.state.current.humidity)
                    }
                    </span>
                    <span className="precip">{ 
                        JSON.stringify(this.state.current.precip)
                    }
                    </span>
                </div>
            </div>
        )
    }
}