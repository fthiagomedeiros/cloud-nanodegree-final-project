import React, {Component} from 'react';

class EachProduct extends Component {

    render() {
        const { products, onDeleteProduct } = this.props;
        return (
            <ol className='product-list'>
                {products.map(product => (

                    <li key={product.id} className='product-list-item'>

                        <div className='product-image' style={{
                            backgroundImage: `url(https://products-images-ufp-dev.s3.amazonaws.com/${product.id}`
                        }}/>

                        <div className='contact-details'>
                            <p>{product.name}</p>
                            <p>{product.description}</p>
                            <p>Price: {product.price}</p>
                        </div>

                        <button onClick={() => onDeleteProduct(product)} className='product-remove'>
                            Remove
                        </button>
                    </li>

                ))}
            </ol>
        );
    }
}

export default EachProduct;
