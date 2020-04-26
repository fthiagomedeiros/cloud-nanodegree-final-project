import React, {Component} from 'react';
import serializeForm from "form-serialize";
import {postProduct} from "../api/ProductsApi";
import EdiText from 'react-editext'

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

    handleEditName = val => {
        this.setState({name: val})
    }

    handleEditDescription = val => {
        this.setState({description: val})
    }

    handleEditPricing = val => {
        this.setState({price: val})
    }

    render() {
        return (
            <div>
                <h3>Editing item >>>>> {this.state.id}</h3>
                <label>Name</label>
                <EdiText
                    type='text'
                    value={this.state.name}
                    onSave={this.handleEditName}
                />

                <label>Description</label>
                <EdiText
                    type='text'
                    value={this.state.description}
                    onSave={this.handleEditDescription}
                />

                <label>Pricing</label>
                <EdiText
                    type='number'
                    step='0.1'
                    value={this.state.price}
                    onSave={this.handleEditPricing}
                />

                <br></br>
                <br></br>
                <br></br>
                <button>Submit update</button>
            </div>
        );
    }
}

export default EditProduct;
