import React, {useState} from 'react';
import { Link, BrowserRouter as Router, Route, Switch  } from 'react-router-dom';
import DeleteOutlineSharpIcon from '@material-ui/icons/DeleteOutlineSharp';
import EditIcon from '@material-ui/icons/Edit';
import Product from '../components/Product'
import Fade from 'react-reveal/Fade';
import UpdateProduct from '../components/UpdateProduct'


function ItemsProducts(props) {

    const [state, setState] = useState(false)
    const [update, setUpdate] = useState(false)

    const id = props.id
    const product = props.descricao
    
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
                      onClick={() => setState(!state)}>
                        {props.descricao}
                      </Link> 
                      [{props.id_categoria}]
                <Link>
                <DeleteOutlineSharpIcon 
                    className='delete' 
                    style={{fill: "#B03432"}}
                    onClick={() => props.onDelete(props.id)}
                />
                </Link>
                <Link to={'/updateProducts'} 
                      onClick={() => setUpdate(!update)}
                >
                <EditIcon   
                    style={{fill: "#4F70B3"}}
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
                <Route 
                exact path="/updateProducts"
                render={(props) => <UpdateProduct id={id} 
                                                  show={update}
                                                  product={product}
                                                  />}
                />
            </Switch>
            </Router>
        </div>
      );
}

export default ItemsProducts;