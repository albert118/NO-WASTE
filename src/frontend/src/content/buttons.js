import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import { About, Admin, Home } from './djangoPages'
import "../static/css/buttons.css";

export default class Buttons extends Component {
    render() {
        return (
            <div className="btn-grid">
                <button className="btn-grid-item btnRecipes btn" />
                <button className="btn-grid-item btnPantry btn" />
                <button className="btn-grid-item btnHealth btn" />
            </div>
        )
    }
}

export class RecipesButton extends Component {
    render() {
        return (
            <button className="btnRecipes btn" />
        );
    }
}

export class PantryButton extends Component {
    render() {
        return (
            <button className="btnPantry btn" />
        );
    }
}

export class HealthButton extends Component {
    render() {
        return (
            <button className="btnHealth btn" />
        );
    }
}