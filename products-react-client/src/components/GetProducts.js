import React, { Component } from 'react';
import EachProduct from "./EachProduct";

class GetProducts extends Component {

    state = {
        items: []
    };

    componentDidMount() {
        this.loadDataFromServer()
    }

    onDeleteProduct = (product) => {
        this.setState({items: this.state.items.filter(p => product.id !== p.id)});
        fetch(`/products/${product.id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${this.props.auth.getToken()}`
            }
        }).then(response => {
            if (response.ok) return response.json();
            throw new Error('Network response was not ok')
        })
    };

    loadDataFromServer() {
        try {
            fetch("/products", {
                headers: {
                    Authorization: `Bearer ${this.props.auth.getToken()}`
                }
            }).then(response => {
                if (response.ok) return response.json();
                throw new Error('Network response was not ok.')
            })
                .then(response => this.setState({items: response.items}))
                .catch(error => this.setState({ message: error.message }))
        } catch (e) {
            this.setState({ message: 'Network response was not ok.' })
        }
    }

    render() {
        return (
            <div>
                {this.state.items.length !== 0 && (
                    <EachProduct products={this.state.items} onDeleteProduct={this.onDeleteProduct}
                                 token={this.props.auth.getToken()} />
                )}
                {this.state.items.length === 0 && (
                    <div className='active'>No items available</div>
                )}
            </div>
        );
    }
}

export default GetProducts;
