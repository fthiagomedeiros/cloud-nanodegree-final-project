import React, {Component} from 'react';
import serializeForm from "form-serialize";
import {postProduct} from "../api/ProductsApi";

class EditProduct extends Component {

    state = {
        id: this.props.match.params.id,
        name: this.props.location.state.name,
        description: this.props.location.state.description,
        price: this.props.location.state.price
    }

    componentDidMount() {
        console.log('componentDidMount')
    }

    handleUpdate = (e) => {
        e.preventDefault();
        const values = serializeForm(e.target, { hash: true });
        console.log(values);

        postProduct({
            name: this.state.name,
            description: this.state.description,
            price: this.state.price}, this.state.file, this.props.auth.getToken());

    };

    render() {

        return (
            <div>
                {this.state.id}
            </div>
        );
    }
}

export default EditProduct;
