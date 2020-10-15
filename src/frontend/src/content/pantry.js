// React
import React, { Component } from 'react';

// child elements and components
import NeonClock from '../components/NeonClock';

// styling
import "../static/css/pantry.css";
import "../"
// child elements and components
import { PantryButton } from "./buttons";

export default class Pantry extends Component {
    render() {
        return (
            <article className="pantry">
                <header className="header-custom-view">
                    <article className="header-custom-view-box">
                        <div className="header-grid">
                            <div className="header-custom-grid-item header-title-item">
                                <h1>My Pantry</h1>
                            </div>
                            <div className="header-custom-grid-item btn-back-item">
                                <button className="btnBack btn" />
                            </div>
                            <div className="header-custom-grid-item btn-pantry-item">
                                <PantryButton />
                            </div>
                            <div className="header-custom-grid-item neon-clock-item">
                                <NeonClock />
                            </div>
                        </div>
                    </article>
                </header>
                <section className="content" aria-label="My Pantry">
                    <main>
                        <div className="pantry-item-grid">
                            {/* articles generated per pantry item here. */}
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
            data: null,
        };
    }

    componentDidMount() {
        // add AJAX req here to backend py-view
    }

    render() {
        return (
            <article className="grid-item pantry-grid-item ">
                <div className="pantry-item">
                    <p>SOMETHING IN MY CUPBOARD...</p>
                </div>
            </article>
                
        );
    }
}