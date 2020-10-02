import React, { Component } from 'react';
import './static/css/App.css'; // main app styling
import './static/css/bootstrap-grid.css'; // bootstrap styling
import { withCookies } from 'react-cookie'; // Cookies logic implented
import { Footer, WidgetHeader, Buttons } from './components/base' // main dashboard components
import Login from './components/Login' // auth component logic, interfaces with Django backend
import Logout from './components/Logout' // auth signout logic

class App extends Component {
	render() {
		return (
			<div className="App">
				<div className="section.hero-widget-header">
					<WidgetHeader />
				</div>
				<Buttons />
				<Login />
				<Logout /> 
				<Footer />
			</div>
		);
	}
}

// Albert Ferguson, 2/10/2020 4:16PM
// see this link below on setting up cookies with React
// https://medium.com/@rossbulat/using-cookies-in-react-redux-and-react-router-4-f5f6079905dc
export default withCookies(App);