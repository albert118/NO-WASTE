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
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoading: true,
            loadingDefaultMsg: "loading",
        };
    }

    componentDidMount() {
        this.getData();
    }

    async getData() {
        // make an AJAX get req' for all current inventory in pantry...
        const responseData = await fetchResource("inventory/all", { method: "GET" });
        if (responseData) {
            this.setState({
                items: Object.entries(responseData).map(([key, value]) => (value))
            });
        }
    }

    ItemCards() {
        /* @author Albert Ferguson
         *
         * Maps the item list retrieved from AJAX to PantryItem components.
         * Key of item is set to unique key of object via key prop.
         * Values are unpacked with their respective keys and passed as props to PantryItem.
         */
        return (
            Object.entries(this.state.items).map(([key, value]) => 
                <PantryItem
                    key={key} 
                    title={value["title"]}
                    quantity={value["quantity"]}
                    description={value["description"]}
                    expiryDate={value["expiry_date"]}
                    loadingDefaultMsg={this.state.loadingDefaultMsg}
                />
            )
        );
    }

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
                        {/* articles generated per pantry item here. */}
                        <div className="pantry-item-flex">
                            {/* mapping here to arbitrarily add as many items as needed! */}
                            {this.ItemCards()}
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
            isLoading: false,
            loadingDefaultMsg: props.loadingDefaultMsg,
        };
    }


    render() {
        const { isLoading, loadingDefaultMsg } = this.state;
        return (
            <article className="pantry-item-card-container">
                <div className="pantry-item-card">
                    {/* <img src={this.state.imgSrc}></img> */}
                    <div className="card-body">
                        <h2>{isLoading ? loadingDefaultMsg : this.props.title}</h2>
                        <p>{isLoading ? loadingDefaultMsg : this.props.expiryDate}</p>
                        <p>{isLoading ? loadingDefaultMsg : this.props.quantity}</p>
                        <p>{isLoading ? loadingDefaultMsg : this.props.description}</p>
                    </div>
                    <button>Get More!</button>
                </div>
            </article>
                
        );
    }
}