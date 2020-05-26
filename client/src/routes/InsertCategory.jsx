import React from 'react';
import axios from 'axios';
import { UncontrolledAlert, Button } from 'reactstrap';

export default class InsertCategory extends React.Component {
  state = {
      categoria: ''
  }    
  
  handleChange = event => {
    let cat = event.target.value
    this.setState({
        categoria: cat
    })
  } 

  handleSubmit = event => {
    event.preventDefault()
    const newCategory = {
        categoria: this.state.categoria
    }    

    axios.post('http://localhost:5000/insertCategory', 
                { newCategory },
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
                    <h1>INSERT A NEW CATEGORY</h1>
                    <label>
                    <input placeholder='Category name' type='text' name='categoria' onChange={this.handleChange} />
                    </label>
                    <br />
                    <Button color="dark" type="submit" className='btnButtons'>Add</Button>{' '}
                    
                </form>
            </div>
      )
  }
}


