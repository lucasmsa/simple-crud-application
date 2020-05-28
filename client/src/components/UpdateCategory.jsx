import React from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';
import LightSpeed from 'react-reveal/LightSpeed';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Zoom from 'react-reveal/Zoom';

export default class UpdateCategory extends React.Component {
    state = {
        categoria: '',
        bool: false,
        boolRedirection: false
    }
    
    handleChange = event => {
      let cat = event.target.value
      this.setState( prevValue => {
          return {
              categoria: cat,
              bool: false,
              boolRedirection: false
          }
      })
    } 
  
    handleSubmit = event => {
      this.setState( prevValue => {
          return {
              categoria: prevValue.categoria,
              bool: true,
              boolRedirection: false
            }
      })
      event.preventDefault()
      const newCategory = {
          categoria: this.state.categoria
      }    
  
      axios.put('http://localhost:5000/updateCategory/'+this.props.id, 
                  { newCategory },
                  {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})

      setTimeout(function() { 
          this.setState(prevValue => {
            return {
                categoria: prevValue.categoria,
                bool: true,
                boolRedirection: true
              }
        })  
      }.bind(this), 2000)
    }
    
    render() {
        let showUpdate = this.props.show
        let oldCategory = this.props.categoria
        let newCategory = this.state.categoria

        if(this.state.boolRedirection){
            window.history.replaceState('', '', '/categories')
            window.location.reload(false)
        }

        return (
            <Zoom>
              <div className='update' style={{display: showUpdate ? 'block' : 'none'}}>
                  <form onSubmit={this.handleSubmit} className='insertion'>
                      <label>
                      <input placeholder='Update Category' 
                             type='text' 
                             name='categoria' 
                             onChange={this.handleChange}
                             />
                      </label>
                      <Button color="dark" 
                              type="submit" 
                              className='btnButtons'
                              style={{
                                  width: '12.5%', 
                                  marginBottom: '4.5%'
                                }}  
                            >
                        
                         <ArrowForwardIosIcon />
                      </Button>
                      <LightSpeed left>
                      <h5 style={{marginTop:'10%', 
                                  fontStyle: 'italic', 
                                  display: this.state.bool ? 'block' : 'none'}}>
                                  {oldCategory} has been updated to {newCategory}!
                      </h5>
                      </LightSpeed>
                  </form>
              </div>
            </Zoom>
        )
    }
}
