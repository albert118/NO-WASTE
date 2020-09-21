import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DisplayMapClass from './DisplayMapClass';

export function Home() {
	const apiURL = "http://127.0.0.1:8000/";
	const [appState, setAppState] = useState({
		loading: false,
		data: null,
		responseCode: 404,
	});

	useEffect(() => {
		setAppState({ loading: true});
		axios.get(apiURL).then((response) => {
			console.log(response.status)
			setAppState({ loading: false, data: response.data, responseCode: response.status });
		});
	}, [setAppState]);
	
	return(
		<div dangerouslySetInnerHTML={{__html: String(appState.data)}}/>
	)
}

export function Admin() {
	const apiURL = "http://127.0.0.1:8000/admin";
	const [appState, setAppState] = useState({
		loading: false,
		data: null,
		responseCode: 404,
	});

	useEffect(() => {
		setAppState({ loading: true});
		axios.get(apiURL).then((response) => {
			console.log(response.status)
			setAppState({ loading: false, data: response.data, responseCode: response.status });
		});
	}, [setAppState]);
	
	return(
		<div dangerouslySetInnerHTML={{__html: String(appState.data)}}/>
	)
}

export function About() {
	const apiURL = "http://127.0.0.1:8000/about";
	const [appState, setAppState] = useState({
		loading: false,
		data: null,
		responseCode: 404,
	});

	useEffect(() => {
		setAppState({ loading: true});
		axios.get(apiURL).then((response) => {
			console.log(response.status)
			setAppState({ loading: false, data: response.data, responseCode: response.status });
		});
    }, [setAppState]);
    
	return(
		<div>
            <div dangerouslySetInnerHTML={{__html: String(appState.data)}}/> 
            <div id="sec3">
                <div className="row col-lg-12">
                    <div id="map-outer" className="col-lg-12">
                        <div id="address" className="col-lg-12">
                            <h2>Our Location <strong>No-Waste</strong></h2>
                            <address>
                                <p>Somewhere we can't afford - Australia, Sydney </p>
                                <p><abbr>P:</abbr> 1234567890</p>
                            </address>
                        </div>
                        <div id="mapContainer"><DisplayMapClass/></div>
                    </div>
                </div>
            </div>
        </div>     
	)
}