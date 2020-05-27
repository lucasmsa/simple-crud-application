import React, {useState} from 'react';
import axios from 'axios';
import { Link, BrowserRouter as Router, Route, Switch  } from 'react-router-dom';
import DeleteOutlineSharpIcon from '@material-ui/icons/DeleteOutlineSharp';
import EditIcon from '@material-ui/icons/Edit';
import Product from '../routes/Product'
import Fade from 'react-reveal/Fade';


function ItemsProducts(props) {

    const [state, setState] = useState(false)
    
    function handleClick(){
        props.onDelete(props.id)
    }

    function handleRoute(){
        setState(!state)
    }

    const id = props.id
    
    return (
        
        <div className="items">
        <Router>
            <Fade left>
            <hr 
                color='black'
                width="35%"
                />
            <h5><Link to='/seeProducts' 
                      className="textNames" 
                      style={{color: "#485159"}}
                      onClick={handleRoute}>{props.descricao}</Link> [{props.id_categoria}]
                <Link>
                <DeleteOutlineSharpIcon 
                    className='delete' 
                    style={{fill: "#B03432"}}
                    onClick={handleClick}
                />
                </Link>
                <Link>
                <EditIcon   
                    style={{fill: "#4F70B3"}}
                    onClick=""
                />
                </Link>
                </h5>  
                
                <hr 
                    color='black'
                    width="35%"
                />
            </Fade>
            <Switch>
            <Route 
                exact path="/seeProducts"
                render={(props) => <Product id={id} 
                                            show={state}/>}
            />
            </Switch>
            </Router>
        </div>
      );
}

export default ItemsProducts;