import React, {Component} from 'react';

class EditProduct extends Component {

    componentDidMount() {

    }

    render() {

        return (
            <div>
                <h1>{this.props.match.params.id}</h1>
                <p>{this.props.location.state.name}</p>
                <p>{this.props.location.state.description}</p>
                <p>{this.props.location.state.price}</p>
            </div>
        );
    }
}

export default EditProduct;
