import React, { Component } from 'react';
import './static/css/App.css';
import './static/css/bootstrap-grid.css';
import {Footer, WidgetHeader, Buttons } from './components/base'

export default class App extends Component {
	render() {
		return(
			<div className="App center-children">
				<div className="wrapper-grid center-children">
					<WidgetHeader/>
					<Buttons/>
				</div>
				<Footer/>
			</div>
		)
	}
}