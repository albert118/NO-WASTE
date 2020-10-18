// React
import React, { Component } from 'react';

// child elements and components
import NeonClock from '../components/NeonClock';

// styling
import "../static/css/pantry.css";
import "../"
// child elements and components
import { PantryButton, BackButton } from "./buttons";

export default class Pantry extends Component {
    render() {
        return (
            <article className="pantry">
                <header className="header-custom-view">
                    <article className="hero-header-box black-box">
                        <div className="header-grid">
                            <div className=" header-title-item">
                                <h1>My Pantry</h1>
                            </div>
                            <div className="btn-back-item">
                                <BackButton />
                            </div>  
                            <div className="btn-pantry-item">
                                <PantryButton />
                            </div>
                            <div className="neon-clock-item">
                                <NeonClock />
                            </div>
                        </div>
                    </article>
                </header>
                <section className="content-box black-box" aria-label="My Pantry">
                    <main>
                        <div className="pantry-item-flex">
                            {/* articles generated per pantry item here. */}
                            <PantryItem />
                            <PantryItem />
                            <PantryItem />
                            <PantryItem />
                            <PantryItem />
                        </div>
                    </main>
                </section>
            </article>
        );
    }
}


class PantryItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
        };
    }

    componentDidMount() {
        // add AJAX req here to backend py-view
    }

    render() {
        return (
            <article className="pantry-item-card-container">
                <div className="pantry-item-card">
                    <img src={this.props.imgURL}></img>
                    <div className="card-body">
                        <h2>{this.props.title}</h2>
                        <p>{this.props.description}</p>
                    </div>
                    <button>Get More!</button>
                </div>
            </article>
                
        );
    }
}