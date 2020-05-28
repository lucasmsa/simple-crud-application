import React from 'react';

export default function ItemsProducts(props) {
    return (
        <div className="items">
            <h6>{props.descricao}</h6>
           {window.history.replaceState('', '', '/categories')}
        </div>
      );
}