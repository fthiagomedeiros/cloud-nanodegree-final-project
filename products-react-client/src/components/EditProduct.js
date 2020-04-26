import React, {Component} from 'react';
import EdiText from 'react-editext'
import { patchProduct } from "../api/ProductsApi";
import serializeForm from "form-serialize";

class EditProduct extends Component {

    state = {
        id: this.props.match.params.id,
        name: this.props.location.state.name,
        description: this.props.location.state.description,
        price: this.props.location.state.price,
        token: this.props.location.state.token,
        updated: false
    }

    componentDidMount() {
        console.log('Now we have a token ' + this.state.token)
    }

    handleUpdate = (e) => {
        e.preventDefault();
        const values = serializeForm(e.target, { hash: true });
        console.log(values);

        patchProduct(this.state.id, {
            name: this.state.name,
            description: this.state.description,
            price: Number(this.state.price)}, this.state.token);

        setTimeout(() => {
            this.setState({updated: true})
        })
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
                {this.state.updated && (
                    <div className='active'>Item has been updated</div>
                )}

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

                <button  onClick={this.handleUpdate}>Submit update</button>
            </div>
        );
    }
}

export default EditProduct;
