import React, { Component } from 'react';
import ReactDOM from 'react-dom';



export default class Add extends Component {
    render() {
        return (
            <div className="container">
                <form>
                    <div className="form-group">
                        <label for="category_name">Category Name</label>
                        <input type="text" className="form-control" id="category_name" aria-describedby="emailHelp" placeholder="Enter category"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>                
            </div>
        );
    }
}
