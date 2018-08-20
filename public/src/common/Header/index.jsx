import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { Link } from 'react-router-dom';
import logo from 'assets/img/logo.svg';
import routes from 'config/routes';
import './style.css';

export default class Header extends React.PureComponent {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState(state => ({
      isOpen: !state.isOpen
    }));
  };

  render() {
    return (
      <Navbar className="header mb-5" color="dark" dark expand="xl">
        <NavbarBrand>
          <img src={logo} className="header--logo" alt="logo" />
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse
          className="justify-content-md-center"
          isOpen={this.state.isOpen}
          navbar
        >
          <Nav navbar>
            <NavItem>
              <NavLink tag={Link} to={routes.ROUTES.SEND_EMAIL}>
                Send Email
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to={routes.ROUTES.DASHBOARD}>
                Dashboard
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}
