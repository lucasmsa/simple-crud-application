import React from 'react';
import axios from 'axios';
import { UncontrolledAlert } from 'reactstrap';
import { Button } from 'reactstrap';
import FlashMessage from 'react-flash-message'

export default class InsertProduct extends React.Component {
  state = {
      descricao: '',
      id_categoria: ''
  }

  Message = () => (
    <FlashMessage duration={5000}>
      <strong>I will disapper in 5 seconds!</strong>
    </FlashMessage>
  )
  
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
                    <Button color="dark" type="submit" className='btnButtons'>Add</Button>{' '}
                    

                    
                </form>
            </div>
      )
  }
}


