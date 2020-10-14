import React, { Component } from 'react';
import './static/css/App.css';
import './static/css/bootstrap-grid.css';
import { Footer } from './components/base';
import { HeroHeader } from './components/heroHeader';
import { Buttons } from './components/buttons';

export default class App extends Component {
	render() {
		return(
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
			</div>
		)
	}
}