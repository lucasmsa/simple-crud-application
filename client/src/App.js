import React, {useState} from "react";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
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

import Home from './routes/Home';
import InsertProduct from './routes/InsertProduct';
import InsertCategory from './routes/InsertCategory';
import Update from './routes/Update';
import ProductsList from './routes/All_Products';
import CategoriesList from './routes/All_Categories'



export default function App() {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Router >
      <div class='full-height' style={{paddingBottom: '10%'}}>
        <Navbar color="dark" dark expand='md'>
          <NavbarBrand to='/'>Products</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar></Collapse>
            <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink><Link to="/" style={{color: 'white'}}>Home</Link></NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Insert
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <NavLink><Link to="/insertProduct" style={{color: 'black'}}>Products</Link></NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink><Link to="/insertCategory" style={{color: 'black'}}>Categories</Link></NavLink>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
              
            </NavItem>
            <NavItem>
              <NavLink><Link to="/update" style={{color: 'white'}}>Update</Link></NavLink>
            </NavItem>
            <NavItem>
              <NavLink><Link to="/categories" style={{color: 'white'}}>Categories</Link></NavLink>
            </NavItem>
            <NavItem>
              <NavLink><Link to="/products" style={{color: 'white'}}>Products</Link></NavLink>
            </NavItem>
          </Nav>
        </Navbar>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/insertProduct">
            <InsertProduct />
          </Route>
          <Route path="/insertCategory">
            <InsertCategory />
          </Route>
          <Route path="/update">
            <Update />
          </Route>
          <Route path="/products">
            <ProductsList />
          </Route>
          <Route path="/categories">
            <CategoriesList />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

