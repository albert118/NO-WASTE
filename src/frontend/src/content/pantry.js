// React
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

// child elements and components
import NeonClock from '../components/NeonClock';

// styling
import "../static/css/pantry.css";
import "../"

// child elements and components
import { PantryButton, BackButton } from "./buttons";
import { fetchResource } from "../components/base";

class Pantry extends Component {
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
        if (String(responseData).includes("login")) {
            this.props.history.push("/login");
        } else if (typeof (responseData) === Object) {
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
                    lastBought={value["added_date"]}
                    expiryDate={value["expiry_date"]}
                    loadingDefaultMsg={this.state.loadingDefaultMsg}
                    description={value["description"]}
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
                <div className="pantry-item-card level-3">
                    {/* <img src={this.state.imgSrc}></img> */}
                    <div className="card-body">
                        <div className="card-title-details card-subheading">
                            {isLoading ? loadingDefaultMsg : this.props.description}
                        </div>
                        <h2 className="card-title-details card-heading">
                            <strong>{isLoading ? loadingDefaultMsg : this.props.title}</strong>
                        </h2>
                        <p>
                            Expiry Date: {
                                isLoading ? loadingDefaultMsg :
                                    new Date(this.props.expiryDate).toLocaleDateString()
                            }
                            <br></br>
                            Last Added: {
                                isLoading ? loadingDefaultMsg :
                                    new Date(this.props.lastBought).toLocaleDateString()
                            }
                        </p>
                        <p></p>
                        <p>
                            Quantity: {
                                isLoading ? loadingDefaultMsg :
                                    this.props.quantity
                            }
                        </p>
                    </div>
                </div>
            </article>
                
        );
    }
}

export default withRouter(Pantry);