import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import DeleteOutlineSharpIcon from '@material-ui/icons/DeleteOutlineSharp';
import EditIcon from '@material-ui/icons/Edit';

function ItemsCategories(props) {

    function handleClick(){
        props.onDelete(props.id)
    }

    function handleCategory(){
        props.onCategory(props.id)
    }

    return (
        <div className="items">
        <hr 
                color='rgba(93,104,115,0.2)'
                width="35%"
                opacity="40%"
            />
          <h5><Link to={'/categories/${props.id}'} className="textNames" style={{color: "#485159"}} onClick={handleCategory}>{props.categoria}</Link> [{props.id}]
            <Link>
            <DeleteOutlineSharpIcon
                className='delete' 
                color="secondary"
                onClick={handleClick}
            />
            </Link>
            <Link>
            <EditIcon 
                color="primary"
                onClick=""
            />
            </Link>
            </h5>
        
            <hr 
                color='rgba(93,104,115,0.2)'
                width="35%"
                opacity="40%"
            />
        </div>
      );
}

export default ItemsCategories;