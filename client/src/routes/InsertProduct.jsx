import React from 'react';
import axios from 'axios';
import { UncontrolledAlert } from 'reactstrap';

export default class InsertProduct extends React.Component {
  state = {
      descricao: '',
      id_categoria: ''
  }
  
  handleChange = event => {
    
    const { name, value }  = event.target;

    this.setState(previousValue => {
        if (name === 'descricao'){
            return {
                descricao: value,
                id_categoria: previousValue.id_categoria
            }
        } else if (name === 'id_categoria'){
            return {
                descricao: previousValue.descricao,
                id_categoria: value
            }
        }
    })
  }

  handleSubmit = event => {
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
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                    Product Description:
                    <input type='text' name='descricao' onChange={this.handleChange} />
                    </label>
                    <label>
                    Product Category:
                    <input type='text' name='id_categoria' onChange={this.handleChange} />
                    </label>
                    <button type="submit">Add</button>
                    <UncontrolledAlert color="info">
                        {this.state.descricao} has been added to products!
                    </UncontrolledAlert> 

                    
                </form>
            </div>
      )
  }
}


