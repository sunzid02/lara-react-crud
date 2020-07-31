import React, { Component } from 'react';
import  axios  from 'axios';
import { baseUrl } from '../../baseUrl';
import { Link } from 'react-router-dom';
import Pagination from "react-js-pagination";
import SuccessAlert from './SuccessAlert';
import ErrorAlert from './ErrorAlert';


export default class Listing extends Component {

    constructor() { 

        super();

        this.state = {
            categories: [],
            activePage: 1,
            itemsCountPerPage: 1,
            totalItemsCount: 1,
            pageRangeDisplayed: 3,
            alert_message: '',

        };
    }

    componentDidMount() {

        axios.get(baseUrl + 'category')
        .then(response => {

            this.setState({
                categories: response.data.data,
                activePage: response.data.current_page,
                itemsCountPerPage: response.data.per_page,
                totalItemsCount: response.data.total,
                pageRangeDisplayed: 3,
                alert_message: '',

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

            this.setState({
                alert_message: 'success'
            });
        })
        .catch(error => {

            this.setState({
                alert_message: 'error'
            });
        });
        // .then(response => {

        //     this.setState({
        //         categories: response.data
        //     });
        // });
    }

    handlePageChange(pageNumber) {

        axios.get(baseUrl + 'category?page='+pageNumber)
        .then(response => {

            this.setState({
                categories: response.data.data,
                activePage: response.data.current_page,
                itemsCountPerPage: response.data.per_page,
                totalItemsCount: response.data.total,
                pageRangeDisplayed: 3,
            });
        });
    }

    render() {
        return (
            <div className="container">
                <br />

                {this.state.alert_message == 'success' ? <SuccessAlert /> : null}
                {this.state.alert_message == 'error' ? <ErrorAlert /> : null}

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
                                            <Link  to={`/category/edit/${category.id}`}> Edit </Link> | 
                                           <a href="#"  onClick={this.onDelete.bind(this, category.id)}> Delete </a>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

                {/* pagination */}
                <div className="d-flex justify-content-center">
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={this.state.itemsCountPerPage}
                        totalItemsCount={this.state.totalItemsCount}
                        pageRangeDisplayed={this.state.pageRangeDisplayed}
                        onChange={this.handlePageChange.bind(this)}
                        itemClass='page-item'
                        linkClass='page-link'
                    />
                </div>
            </div>
        );
    }
}
