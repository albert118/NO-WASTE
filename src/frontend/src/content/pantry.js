// React
import React, { Component } from 'react';

// child elements and components
import NeonClock from '../components/NeonClock';

// styling
import "../static/css/pantry.css";
import "../"
// child elements and components
import { PantryButton, BackButton } from "./buttons";
import { fetchResource } from "../components/base";

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
            title: ' ',
            quantity: ' ',
            imgSrc: ' ',
            expiryDate: '',
        };
    }

    componentDidMount() {
        // make an AJAX get req' for all current inventory in pantry...
        const data = fetchResource("inventory/all", {method: "GET"});
        this.setState({
            title: data.title,
            quantity: data.quantity,
            imgSrc: data.imgSrc,
            expiryDate: data.expiryDate,
        });
    }

    render() {
        return (
            <article className="pantry-item-card-container">
                <div className="pantry-item-card">
                    <img src={this.state.imgSrc}></img>
                    <div className="card-body">
                        <h2>{this.state.title}</h2>
                        <p>{this.state.expiryDate}</p>
                        <p>{this.state.quantity}</p>
                    </div>
                    <button>Get More!</button>
                </div>
            </article>
                
        );
    }
}