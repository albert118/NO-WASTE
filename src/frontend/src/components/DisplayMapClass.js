import React, { Component } from 'react';

export default class DisplayMapClass extends Component {
    mapRef = React.createRef();
    state = { map: null };

    componentDidMount() {
        const H = window.H;
        const platform = new H.service.Platform({
            'apikey': 'nXMHo9NcL4xgf0L5w8PuA22dJ_Qn9nwJVMAzF7hT4GU'
        });

        const defaultLayers = platform.createDefaultLayers(); // Obtain the default map types from the platform object:

        const map = new H.Map(
            this.mapRef.current,
            defaultLayers.vector.normal.map,
            {
                zoom: 14,
                center: {lat:-33.8692265, lng:151.2045018}, // Enter the latitude and longitude of your office here
                pixelRatio: window.devicePixelRatio || 1
            }
        );

        // MapEvents enables the event system
        // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
        // This variable is unused and is present for explanatory purposes
        const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

        // Create the default UI components to allow the user to interact with them
        // This variable is unused
        const ui = H.ui.UI.createDefault(map, defaultLayers);

        this.setState({ map });
    }

    componentWillUnmount() {
        this.state.map.dispose();
    }

    render() {
        return(
            <div ref={ this.mapRef } style={{ height: "500px" }} />
        );
    }
}