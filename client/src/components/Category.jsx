import React from 'react';
import axios from 'axios';
import Fade from 'react-reveal/Fade';
import ProductsInCategory from '../items/ProductsInCategory';

export default class Category extends React.Component {

    state = {
        products: []
    }
  
    componentDidMount() {
      axios.get(`http://localhost:5000/productsincategory/` + this.props.id)
        .then(res => {
          const productsInCategory = res.data;
          console.log(productsInCategory)
          this.setState({ 
                products: productsInCategory 
            });
        })
        
    }
  
    render() {
      let showDiv = this.props.show
      console.log(this.state.products)
      return (
            <Fade>
                <div style={{ display: showDiv ? 'block' : 'none'}}>
                    {this.state.products.map(
                        product => <ProductsInCategory 
                                        descricao={product.descricao}
                                    />
                    )}
                </div>
            </Fade>
      )
    }
  }