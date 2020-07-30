import React, { Component } from 'react';

import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import Add from './Add';
import Listing from './Listing';


export default class Index extends Component {
    render() {
        return (
            <div className="container">
            <Router>
                <div>
                    <Link to="/category">Listing</Link>
                    <Link to="/category/add"> Add</Link>

                    <Route exact path="/category" component={ Listing } />
                    <Route exact path="/category/add" component={ Add } />

                </div>
            </Router>                
            </div>
        );
    }
}
