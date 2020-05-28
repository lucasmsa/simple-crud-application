import React from 'react';
import axios from 'axios';
import ItemsCategories from '../items/ItemsCategories'

export default class CategoriesList extends React.Component {
    state = {
      categories: []
    }

    deleteItem = id => {
        axios.delete('http://localhost:5000/deleteCategory/' + id)
          .then(res => {
            window.location.reload(false);
        })
    }
  
    componentDidMount() {
      axios.get(`http://localhost:5000/categories`)
        .then(res => {
          const categories = res.data;
          this.setState({ categories });
        })
    }
  
    render() {
    
      return (
        
        <ul className='lists'>
          
          { this.state.categories.map(
                category => <ItemsCategories
                                key={category.id}
                                id={category.id}
                                onCategory={this.getCategoryInfo}
                                categoria={category.categoria}
                                onDelete={this.deleteItem}
                                />
                            )
                        }
        </ul>
      )
    }
  }