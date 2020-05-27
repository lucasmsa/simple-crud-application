import React, {useState} from 'react';
import axios from 'axios';
import Fade from 'react-reveal/Fade';


function ItemsProducts(props) {

    const [state, setState] = useState(false)
    
    function handleClick(){
        props.onDelete(props.id)
    }

    function handleRoute(){
        setState(!state)
    }
    
    return (
        <div className="items">
            <h6>{props.descricao}</h6>
        </div>
      );
}

export default ItemsProducts;