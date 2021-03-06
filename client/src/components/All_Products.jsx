import React from 'react';
import axios from 'axios';
import ItemsProducts from '../items/ItemsProducts';

export default class ProductsList extends React.Component {
    state = {
      products: [],
      bool: false
    }

    deleteItem = id => {
      axios.delete('http://localhost:5000/deleteProduct/' + id)
        .then(res => {
          window.history.replaceState('', '', '/products')
          window.location.reload(false);
        })
    }
  
    componentDidMount() {
      axios.get(`http://localhost:5000/products`)
        .then(res => {
          const products = res.data;
          this.setState({ 
            products: products, 
            bool: false
          });
        })
    }
  
    render() {
      
      return (
        <ul className='lists'>
          { this.state.products.map(
            product => <ItemsProducts 
                          key={product.id}
                          id={product.id}
                          descricao={product.descricao}
                          id_categoria={product.id_categoria}
                          onDelete={this.deleteItem}
                          />)}
        </ul>
      )
    }
  }