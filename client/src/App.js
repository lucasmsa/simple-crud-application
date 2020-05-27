import React, {useState} from "react";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';

import InsertProduct from './routes/InsertProduct';
import InsertCategory from './routes/InsertCategory';
import ProductsList from './routes/All_Products';
import CategoriesList from './routes/All_Categories'



export default function App() {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const handleReload = () => {
    setTimeout(function() { 
      window.location.reload(false)
    }.bind(this), 1)
  }

  return (
    <Router >
      <div class='full-height' style={{paddingBottom: '10%'}}>
        <Navbar color="dark" dark expand='md'>
          <NavbarBrand to='/products'><NavLink><Link onClick={handleReload} to="/products" 
                       style={{color: 'white'}} className="brand">Products</Link></NavLink></NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar></Collapse>
            <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink><Link to="/categories" style={{color: 'white'}}>Categories</Link></NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Insert
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <Link to='/insertProduct'><NavLink><h6 style={{color: '#485159'}}>Products</h6></NavLink></Link>
                </DropdownItem>
                <DropdownItem>
                  <Link to='/insertCategory'><NavLink><h6 style={{color: '#485159'}}>Categories</h6></NavLink></Link>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Navbar>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
        <Route exact path="/">
            <Redirect to="/products" />
          </Route>
          <Route path="/insertProduct">
            <InsertProduct />
          </Route>
          <Route path="/insertCategory">
            <InsertCategory />
          </Route>
          <Route path="/products">
            <ProductsList />
          </Route>
          <Route path="/categories">
            <CategoriesList />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

