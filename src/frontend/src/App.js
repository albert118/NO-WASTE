// React
import React, { Component } from 'react';
import {
    Switch,
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

// styling
import './static/css/App.css'; // main app styling
import './static/css/bootstrap-grid.css'; // bootstrap styling

// cookies
import { withCookies } from 'react-cookie'; // Cookies logic implented

// child components and elements
import { Footer } from './components/base';

// content components
import { HeroHeader } from './content/heroHeader';
import Buttons from './content/buttons';
import Pantry from './content/pantry' // pantry view

// auth 
import Login from './auth/Login'   // auth component logic, interfaces with Django backend
import Logout from './auth/Logout' // auth signout logic
import SignUp from './auth/SignUp' // auth signup logic

//errors
import error400 from './HTTPerror/error400.js' 
import error401 from './HTTPerror/error401.js' 
import error403 from './HTTPerror/error403.js' 
import error404 from './HTTPerror/error404.js' 
import error500 from './HTTPerror/error500.js' 

class App extends Component {
	render() {
		return (
            <Router>
                <div className="App">
                    <Switch>
                        {/* Excellent answer on rendering a / route */}
                        {/* https://stackoverflow.com/a/44292410/9505707 */}
                        <Route exact path="/" component={HomeDashboard} />
                        <Route path="/login" component={Login} />
                        <Route path="/logout" component={Logout} />
                        <Route path="/signup" component={SignUp} />
                        <Route path="/pantry" component={Pantry} />
                        {/*  Error rotues */}
                        <Route path="/error400" component={error400} />
                        <Route path="/error404" component={error404} />
                        <Route path="/error500" component={error500} />
                        <Route path="/error403" component={error403} />
                        <Route path="/error401" component={error401} />
                        <Route component={error404} /> {/* Default route on no other route found (404 not found). */}
                    </Switch>
                    <Footer />
                </div>
            </Router>
		);
	}
}

class HomeDashboard extends Component {
    render() {
        return (
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
        );
    }
}


// Albert Ferguson, 2/10/2020 4:16PM
// see this link below on setting up cookies with React
// https://medium.com/@rossbulat/using-cookies-in-react-redux-and-react-router-4-f5f6079905dc
export default withCookies(App);