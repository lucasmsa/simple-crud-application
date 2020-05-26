import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DeleteOutlineSharpIcon from '@material-ui/icons/DeleteOutlineSharp';
import EditIcon from '@material-ui/icons/Edit';

function ItemsProducts(props) {

    function handleClick(){
        props.onDelete(props.id)
    }

    function handleProduct(){
        props.onProduct(props.id)
    }

    return (
        <div className="items">
        <hr 
                color='rgba(93,104,115,0.2)'
                width="35%"
                opacity="40%"
            />
          <h5><Link className="textNames" style={{color: "#485159"}} onClick={handleProduct}>{props.descricao}</Link> [{props.id_categoria}]
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
                color='rgba(93,104,115,0.2)'
                width="35%"
                opacity="40%"
            />
        </div>
      );
}

export default ItemsProducts;