import React from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';
import LightSpeed from 'react-reveal/LightSpeed';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Zoom from 'react-reveal/Zoom';

export default class UpdateProduct extends React.Component {
    state = {
        descricao: '',
        id_categoria: '',
        bool: false,
        boolRedirection: false
    }
    
    handleChange = event => {

        const { name, value }  = event.target;

        this.setState(previousValue => {
            if (name === 'descricao'){
                return {
                    descricao: value,
                    id_categoria: previousValue.id_categoria,
                    bool: false,
                    boolRedirection: false
                }
            } else if (name === 'id_categoria'){
                return {
                    descricao: previousValue.descricao,
                    id_categoria: value,
                    bool: false,
                    boolRedirection: false
                }
            }
        })
    } 
  
    handleSubmit = event => {
        this.setState(prevValue => {
            return {
                descricao: prevValue.descricao,
                id_categoria: prevValue.id_categoria,
                bool: true,
                boolRedirection: false
            }
        })
        
        event.preventDefault()
        const newProduct = {
            descricao: this.state.descricao,
            id_categoria: this.state.id_categoria
        }    
  
        axios.put('http://localhost:5000/updateProduct/'+this.props.id, 
                { newProduct },
                {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})

        setTimeout(function() { 
            this.setState(prevValue => {
                return {
                    descricao: prevValue.descricao,
                    id_categoria: prevValue.id_categoria,
                    bool: true,
                    boolRedirection: true
                }
            })  
        }.bind(this), 2000)
    }
    
    render() {
        let showUpdate = this.props.show
        let oldProduct = this.props.product
        let newProduct = this.state.descricao

        if(this.state.boolRedirection){
            window.history.replaceState('', '', '/products')
            window.location.reload(false)
        }

        return (
            <Zoom>
              <div className='update' style={{display: showUpdate ? 'block' : 'none'}}>
                  <form onSubmit={this.handleSubmit} className='insertion'>
                        <label>
                        <input placeholder='Update Product Description' type='text' name='descricao' onChange={this.handleChange} />
                        </label>
                        <br />
                        <label>
                        <input placeholder="Update Product Category" type='text' name='id_categoria' onChange={this.handleChange} />
                        </label>
                        <br />
                        <Button color="dark" 
                                type="submit" 
                                className='btnButtons'
                                style={{
                                    width: '8%', 
                                    marginBottom: '4.5%'
                                    }}  
                                >
                        <ArrowForwardIosIcon />
                      </Button>
                      <LightSpeed left>
                      <h5 style={{marginTop:'10%', 
                                  fontStyle: 'italic', 
                                  display: this.state.bool ? 'block' : 'none'}}>
                                  {oldProduct} has been updated to {newProduct}!
                      </h5>
                      </LightSpeed>
                  </form>
                  {window.history.replaceState('', '', '/products')}
              </div>
            </Zoom>
        )
    }
}
