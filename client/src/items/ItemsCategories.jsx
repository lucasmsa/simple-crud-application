import React, { useState } from 'react';
import { Link, BrowserRouter as Router, Route, Switch  } from 'react-router-dom';
import DeleteOutlineSharpIcon from '@material-ui/icons/DeleteOutlineSharp';
import EditIcon from '@material-ui/icons/Edit';
import Fade from 'react-reveal/Fade';
import Category from '../components/Category'
import {Capitalize} from 'react-lodash'
import UpdateCategory from '../components/UpdateCategory'


export default function ItemsCategories(props) {

    const [state, setState] = useState(false)
    const [update, setUpdate] = useState(false)

    function handleClick(){
        props.onDelete(props.id)
    }
    
    const category_id = props.id;
    const category = props.categoria;

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
                    onClick={() => setState(!state)}
                    >
                    <Capitalize string={category} />
                    </Link> 
                    [{props.id}]
            <Link>
            <DeleteOutlineSharpIcon 
                className='delete' 
                style={{fill: "#B03432"}}
                onClick={handleClick}
            />
            </Link>
            <Link 
                to={'/updateCategory'}
                onClick={() => setUpdate(!update)}
                name='edit'    
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
                    exact path="/productsPerCategory"
                    render={(props) => <Category id={category_id} 
                                                 show={state}/>}
                />
                <Route
                    exact path="/updateCategory"
                    render={(props) => <UpdateCategory id={category_id} 
                                                       show={update}
                                                       categoria={category}     
                                                       />}
                />
            </Switch>
        </Router>
        </div>
      );
}