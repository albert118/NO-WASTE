// React
import React, { Component } from 'react';
import {
  Switch,
  Router,
  Link
} from 'react-router-dom';

// styling
import './static/css/App.css'; // main app styling
import './static/css/bootstrap-grid.css'; // bootstrap styling

// cookies
import { withCookies } from 'react-cookie'; // Cookies logic implented

// custom components
import { Footer } from './components/base';
import { HeroHeader } from './components/heroHeader';
import { Buttons } from './components/buttons';
import Login from './components/Login' // auth component logic, interfaces with Django backend
import Logout from './components/Logout' // auth signout logic
import SignUp from './components/SignUp' // auth signup logic

class App extends Component {
	render() {
		return (
        <Router>
            <div className="App">
                <div className="dashboard-grid">
					          <section className="hero">
						            <div className="grid-item hero-main">
							              <HeroHeader />
						            </div>
					         </section>
					          <section className="content">
						            <div className="grid-item content-main">
							              <Buttons />
					            	</div>
					          </section>
				       </div>
				       <Footer />
					     <Switch>
						     {/* Excellent answer on rendering a / route */}
						     {/* https://stackoverflow.com/a/44292410/9505707 */}
						     <Route exact path="/" />
						     <Route path="/login" component={LoginOrSignUp} />
					      </Switch>
              </div>
        </Router>
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