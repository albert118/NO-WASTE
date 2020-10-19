import React, { Component } from 'react';
import "../static/css/weather-widget.css";

export default class WeatherWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            location: {},
            current: {},
            icons: [],
            date: null,
        };
    }

    async componentDidMount() {
        this.setDate();
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

    setDate() {
        /**
         * Set the date value according to today's date.
         * Formats as string according to local provided.
         * 
         * @returns no return, setter called internally.
         */

        function getOrdforDate(dayNum) {
            /**
             *  Return the correct ordinal for the number provided.
             * 
             * @param {Number or String} the day as a number to check
             * (or any number).
             * @returns {String} the ordinal value to append to your
             * original value.
             */
            var input = dayNum;
            let idx;

            if (typeof (input) === String) {
                try {
                    input = Number(input);
                } catch (e) {
                    return '';
                }
            }

            if (input <= 0) {
                idx = 4;
            } else if (input > 3 && input < 21 || input % 10 > 3) {
                idx = 0; 
            } else {
                idx = input % 10;

            }

            return ["th", "st", "nd", "rd", ''][idx];
        }

        const today = new Date();
        const opts = {month: "short", day: "numeric" };
        const local = "en-GB";
        const fullDate = today.toLocaleDateString(local, opts);
        const idxToInsert = fullDate.indexOf(' ');
        const formattedDate = [
            fullDate.slice(0, idxToInsert),
            getOrdforDate(today.getDate()),
            fullDate.slice(idxToInsert)
        ].join('');

        this.setState({ date: formattedDate });
        return;
    }

    render() {
        const { loading, location, current, icons, date } = this.state;
        const isLoading = "loading";

        return( 
            <div className="widget-grid">
                <div className="main-left">
                    <span className="current-icon">{loading ? isLoading : <img src={String(icons)} />}</span>
                </div>
                <div className="divider"/>
                <div className="main-right">
                    <div className="neon-grid">
                        <p className="weather-detail">
                            {loading ? isLoading :
                                ["Precip:", current.precip,
                                    "mm", "Humid:", current.humidity,
                                    "%"].join(' ')
                            }
                        </p>
                        <span className="neon-elem date">
                            {loading ? isLoading : date}
                        </span>
                        <span className="neon-elem temperature">
                            {loading ? isLoading : current.temperature + "°c"}
                        </span>
                    </div>    
                </div>
                <div className="location">
                    <span>
                        {loading ? isLoading :
                            [location.name, ',',
                            location.region, ',',
                            location.country].join(' ')
                        }
                    </span>
                </div>
            </div>
        )
    }
}