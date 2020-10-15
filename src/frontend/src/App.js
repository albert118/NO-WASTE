// React
import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
} from 'react-router-dom';

// styling
import './static/css/App.css'; // main app styling
import './static/css/bootstrap-grid.css'; // bootstrap styling

// cookies
import { withCookies } from 'react-cookie'; // Cookies logic implented

// custom components
import {
	Footer,
	WidgetHeader,
	Buttons
} from './components/base' // main dashboard components
import Login from './components/Login' // auth component logic, interfaces with Django backend
import Logout from './components/Logout' // auth signout logic
import SignUp from './components/signUp' // auth signup logic

class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<nav>
						<ul>
							<li>
								<Link to="/">Home Dashboard</Link>
							</li>
							<li>
								<Link to="/login">Login or Signup</Link>
							</li>
						</ul>
					</nav>
					<Switch>
						{/* Excellent answer on rendering a / route */}
						{/* https://stackoverflow.com/a/44292410/9505707 */}
						<Route exact path="/" component={ HomeDashboard } />
						<Route path="/login" component={LoginOrSignUp } />
					</Switch>
				</div>
				<Footer />
			</Router>	
		);
	}
}


class HomeDashboard extends Component {
	render() {
		return (
			<div className="section.hero-widget-header">
				<WidgetHeader />
				<Logout />
				<Buttons />	
			</div>
		);
	}
}


class LoginOrSignUp extends Component {
	render() {
		return (
			<div>
				<SignUp />
				<Login />
			</div>
			
		);
	}
}


// Albert Ferguson, 2/10/2020 4:16PM
// see this link below on setting up cookies with React
// https://medium.com/@rossbulat/using-cookies-in-react-redux-and-react-router-4-f5f6079905dc
export default withCookies(App);