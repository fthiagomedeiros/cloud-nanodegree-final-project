import React, {Component} from 'react';
import serializeForm from 'form-serialize'
import { postProduct } from '../api/ProductsApi'
import * as bootstrap from '../bootstrap.min.css'
import ImageInput from "./ImageInput";

class CreateProduct extends Component {

    state = {
        name: '',
        description: '',
        price: 0,
        file: ''
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const values = serializeForm(e.target, { hash: true });
        console.log(values);

        const response = postProduct({
            name: this.state.name,
            description: this.state.description,
            price: this.state.price}, this.state.file, this.props.auth.getToken());
    };

    handleNameChange = (event) => {
        this.setState({name: event.target.value});
    };

    handleDescriptionChange = (event) => {
        this.setState({description: event.target.value});
    };

    handlePriceChange = (event) => {
        this.setState({price: parseFloat(event.target.value)});
    };

    handlerFileSelectedCallback = (file) => {
        this.setState({ file : file})
        console.log('selected file content : ' + this.state.file);
        console.log('works ' + this.state.file)
    };


    render() {
        return (
            <div>
                <h1>Create new product form</h1>
                <form onSubmit={this.handleSubmit} className='create-product-form'>

                    <ImageInput
                        className="create-product-input"
                        name="productUrl"
                        maxHeight={64}
                        handlerFileSelectedCallback={this.handlerFileSelectedCallback}
                    />

                    <div className='create-product-details' style={{width: "1024px"}}>

                        <label>Name</label>
                        <input type='text' className="form-control" value={this.state.name}
                               onChange={this.handleNameChange} placeholder='Name' />
                        <br />

                        <label>Description</label>
                        <input  type='text' className="form-control" value={this.state.description}
                               onChange={this.handleDescriptionChange} placeholder='Description' />
                        <br />

                        <label>Price</label>
                        <input type='number' className="form-control" step="0.1" name='price' value={this.state.price}
                               onChange={this.handlePriceChange} placeholder='Price' />
                        <br />

                        <button>Register product</button>
                    </div>

                </form>
            </div>
        );
    }
}

export default CreateProduct;
