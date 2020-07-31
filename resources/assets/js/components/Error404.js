import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Error404 extends Component {
    render() {
        return (
            <div className="alert alert-danger">
                404 Page not found. 
                <Link to="/" className="alert-link">Back to Home</Link>
            </div>
        );
    }
}


