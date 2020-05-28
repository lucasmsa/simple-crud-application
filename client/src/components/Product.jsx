import React from 'react';
import axios from 'axios';
import { Capitalize } from 'react-lodash';
import Fade from 'react-reveal/Fade';

export default class Product extends React.Component {

    state = {
        id: 0,
        categoria: ''
    }
  
    componentDidMount() {
      axios.get(`http://localhost:5000/products/` + this.props.id)
        .then(res => {
          const product = res.data[0];
          this.setState({ 
              id: product.id,
              categoria: product.id_categoria[0].categoria
            });
        })
    }
  
    render() {
    
      let category = this.state.categoria
      let showDiv = this.props.show
      return (
            <Fade>
                <div className='itemInfo' style={{ display: showDiv ? 'block' : 'none'}}>
                    <h5 style={{color: '#485159'}}>Category: <Capitalize string={category} /></h5>
                    <h5 style={{color: '#5D6873'}}>ID: {this.state.id}</h5>
                </div>
            </Fade>
      )
    }
  }