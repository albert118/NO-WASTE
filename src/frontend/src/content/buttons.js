import React, { Component } from 'react';
import { Redirect, useHistory } from "react-router-dom";
import { About, Admin, Home } from './djangoPages';

// styling
import "../static/css/buttons.css";
import { Button } from 'react-bootstrap';

export default class Buttons extends Component {
    render() {
        return (
            <div className="btn-grid">
                <RecipesButton />
                <PantryButton />
                <HealthButton />
            </div>
        );
    }
}

export class RecipesButton extends Component {
    render() {
        return (
            <Button href="/recipes" className="btnRecipes btn" />
        );
    }
}

export class PantryButton extends Component {
    render() {
        return (
            <Button href="/pantry" className="btnPantry btn" />
        );
    }
}

export class HealthButton extends Component {
    render() {
        return (
            <Button href="/health" className="btnHealth btn" />
        );
    }
}

export class BackButton extends Component {
    render() {
        // WHAT A HACK
        // Doesnt actually send you back, just guesses that back is homedash lol
        return (
           <Button href="/" className = "btnBack btn" />
        );
    }
} 
