import React from 'react';
import axios from 'axios';
import { UncontrolledAlert } from 'reactstrap';
import { Button } from 'reactstrap';
import LightSpeed from 'react-reveal/LightSpeed';

export default class InsertProduct extends React.Component {
  state = {
      descricao: '',
      id_categoria: '',
      bool: false
  }
  
  handleChange = event => {
    
    const { name, value }  = event.target;
    console.log(this.state)
    this.setState(previousValue => {
        if (name === 'descricao'){
            return {
                descricao: value,
                id_categoria: previousValue.id_categoria,
                bool: false
            }
        } else if (name === 'id_categoria'){
            return {
                descricao: previousValue.descricao,
                id_categoria: value,
                bool: false
            }
        }
    })
  }

  handleSubmit = event => {
    this.setState(prevValue => {
        return {
            descricao: prevValue.descricao,
            id_categoria: prevValue.id_categoria,
            bool: true
        }
    })
    console.log(this.state)

    event.preventDefault()
    const newProduct = {
        descricao: this.state.descricao,
        id_categoria: this.state.id_categoria
    }    

    axios.post('http://localhost:5000/insertProduct', 
                { newProduct },
                {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
                .then(res => {
                    console.log(res)
                    console.log(res.data)
                }) 
        }
    

  render() {
      return (
            <div style={{paddingBottom: '23%'}}>
                <form onSubmit={this.handleSubmit} className='insertion'>
                    <h1>INSERT A NEW PRODUCT</h1>
                    <label>
                    <input placeholder='Product Description' type='text' name='descricao' onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                    <input placeholder="Product Category" type='text' name='id_categoria' onChange={this.handleChange} />
                    </label>
                    <br />
                    <Button color="dark" type="submit" className='btnButtons'>Add</Button>
                <LightSpeed left>
                    <h5 style={{marginTop:'10%', 
                                fontStyle: 'italic', 
                                display: this.state.bool ? 'block' : 'none'}}>
                                {this.state.descricao} has been added to the products!
                    </h5>   
                </LightSpeed>            
                </form>
            </div>
      )
  }
}


