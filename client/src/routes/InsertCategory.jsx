import React from 'react';
import axios from 'axios';
import { UncontrolledAlert } from 'reactstrap';

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
                <form onSubmit={this.handleSubmit}>
                    <label>
                    Category name:
                    <input type='text' name='categoria' onChange={this.handleChange} />
                    </label>
                    <button type="submit">Add</button>
                    <UncontrolledAlert color="info">
                        {this.state.categoria} has been added to categories!
                    </UncontrolledAlert> 

                    
                </form>
            </div>
      )
  }
}


