import React, { useState, useEffect } from 'react';
import axios from 'axios';

const About = () => {
	const [appState, setAppState] = useState({ 
		loading: false,
		htmlData: null,
	});

	useEffect(() => {
		setAppState({ loading: true });
		const apiURL = "http://127.0.0.1:8000/api/about/";
		axios.get(apiURL).then((response) => {
			console.log(response.status) 
			setAppState({ loading: false, htmlData: response.data });
		});
	}, [setAppState]);

	return(
		<div>
			{ appState.htmlData }
		</div>
	)
}

export default About;