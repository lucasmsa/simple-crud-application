import React, { useState } from 'react';
import axios from 'axios';
import { Link, BrowserRouter as Router, Route, Switch  } from 'react-router-dom';
import DeleteOutlineSharpIcon from '@material-ui/icons/DeleteOutlineSharp';
import EditIcon from '@material-ui/icons/Edit';
import Fade from 'react-reveal/Fade';
import Category from '../routes/Category'


function ItemsCategories(props) {

    const [state, setState] = useState(false)

    function handleClick(){
        props.onDelete(props.id)
    }

    function handleCategory(){
        setState(!state)
    }

    const category_id = props.id;

    return (
        <div className="items">
        <Router>
        <Fade left>
        <hr 
                color='black'
                width="35%"
            />
          <h5><Link to={'/productsPerCategory'} 
                    className="textNames" 
                    style={{color: "#485159"}} 
                    onClick={handleCategory}>
                    {props.categoria}
                    </Link> 
                    [{props.id}]
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
                exact path="/productsPerCategory"
                render={(props) => <Category id={category_id} 
                                             show={state}/>}
            />
            </Switch>
        </Router>
        </div>
      );
}

export default ItemsCategories;