import React, { Component } from 'react';
import  axios  from 'axios';
import { baseUrl } from '../../baseUrl';
import { Link } from 'react-router-dom';

export default class Listing extends Component {

    constructor() { 

        super();

        this.state = {
            categories: []
        };
    }

    componentDidMount() {

        axios.get(baseUrl + 'category')
        .then(response => {

            this.setState({
                categories: response.data
            });                        
        });
    }

    onDelete(category_id) {

        axios.delete(baseUrl + 'category/delete/' + category_id)
        .then(response => {

            var categories = this.state.categories;

            for (let index = 0; index < categories.length; index++) 
            {
                if (categories[index].id == category_id ) 
                {
                    categories.splice(index, 1);
                    
                    this.setState({
                        categories: categories
                    });
                }
            }


            alert('Deleted successfully');

        })
        // .then(response => {

        //     this.setState({
        //         categories: response.data
        //     });
        // });
    }

    render() {
        return (
            <div className="container">
                <br />

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Category Name</th>
                            <th scope="col">Status</th>
                            <th scope="col">Created At</th>
                            <th scope="col">Updated At</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            this.state.categories.map(category => {
                                return (
                                    <tr key={category.id}>
                                        <th scope="row"> {category.id} </th>
                                        <td>{category.name}</td>
                                        <td>{category.active==1?("Active"):("Inactive") }</td>
                                        <td>{category.created_at}</td>
                                        <td>{category.updated_at}</td>
                                        <td>
                                           <Link to={`/category/edit/${category.id}`}> Edit </Link>
                                           <a href="#" onClick={this.onDelete.bind(this, category.id)}> Delete </a>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}
