import React, { Component } from 'react';
import axios from 'axios';
import { baseUrl } from '../../baseUrl';
import SuccessAlert from './SuccessAlert';
import ErrorAlert from './ErrorAlert';


export default class Edit extends Component {
    constructor(props) {

        super(props);

        this.state = {
            category_name: '',
            alert_message: '',
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
        
        axios.put(baseUrl + 'category/update/' + this.props.match.params.id, category)
        .then( response => {

            this.setState({
                alert_message: 'success'
            });
        })
        .catch(error => {

            this.setState({
                alert_message: 'error'
            });
        });
    }
    
    componentDidMount() {

        axios.get(baseUrl + 'category/edit/'+this.props.match.params.id)
            .then(response => {

                this.setState({
                    category_name: response.data.name
                });
            });
    }


    render() {
        return (
            <div className="container">
                <br/>

                {this.state.alert_message == 'success' ? <SuccessAlert message={"record updated successfully "} /> : null}
                {this.state.alert_message == 'error' ? <ErrorAlert message={"error occured while updating"} /> : null}
               
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
