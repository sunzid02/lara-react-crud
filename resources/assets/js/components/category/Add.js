import React, { Component } from 'react';
import axios from 'axios';
import { baseUrl } from '../../baseUrl';


export default class Add extends Component {
    constructor() {

        super();

        this.state = {
            category_name: ''
        };

        this.onChangeCategoryName = this.onChangeCategoryName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeCategoryName(e) {

        this.setState({
            category_name: e.target.value
        });

        // console.log(e.target.value);

    }

    onSubmit(e) {

        e.preventDefault();

        const category = {
            category_name: this.state.category_name
        }
        
        axios.post(baseUrl+'category/store', category)
        .then( response => console.log(response.data) );
    }
    
    render() {
        return (
            <div className="container">
                <br/>
                <form onSubmit={ this.onSubmit }>
                    <div className="form-group">
                        <label htmlFor="category_name">Category Name</label>
                        
                        <input 
                            type="text" 
                            className="form-control" 
                            id="category_name" 
                            placeholder="Enter category"

                            value={ this.state.category_name }
                            onChange={ this.onChangeCategoryName }

                        
                        />

                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>                
            </div>
        );
    }
}
