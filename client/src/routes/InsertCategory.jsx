import React from 'react';
import axios from 'axios';
import { UncontrolledAlert, Button } from 'reactstrap';
import LightSpeed from 'react-reveal/LightSpeed';

export default class InsertCategory extends React.Component {
  state = {
      categoria: '',
      bool: false
  }    
  
  handleChange = event => {
    let cat = event.target.value
    this.setState( prevValue => {
        return {
            categoria: cat,
            bool: false
        }
    })
  } 

  handleSubmit = event => {
    this.setState( prevValue => {
        return {
            categoria: prevValue.categoria,
            bool: true
            }
    })
      
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
            <div className='fill-blue'>
                <form onSubmit={this.handleSubmit} className='insertion'>
                    <h1>INSERT A NEW CATEGORY</h1>
                    <label>
                    <input placeholder='Category name' type='text' name='categoria' onChange={this.handleChange} />
                    </label>
                    <br />
                    
                    <Button color="dark" type="submit" className='btnButtons'>Add</Button>  
                    <LightSpeed left>
                    <h5 style={{marginTop:'10%', 
                                fontStyle: 'italic', 
                                display: this.state.bool ? 'block' : 'none'}}>
                                {this.state.categoria} has been added to the categories!
                    </h5>
                    </LightSpeed>
                </form>
            </div>
      )
  }
}


