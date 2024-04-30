import React from "react";
import { Link } from "react-router-dom";
import Headroom from "headroom.js";
import {
  Button,
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  UncontrolledTooltip,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
} from "reactstrap";

class NavBar_LoggedIn extends React.Component {
  componentDidMount() {
    // Initialize Headroom
    let headroom = new Headroom(document.getElementById("navbar-main"));
    headroom.init();
  }
  
  state = {
    collapseClasses: "",
    collapseOpen: false,
  };

  onExiting = () => {
    this.setState({
      collapseClasses: "collapsing-out",
    });
  };

  onExited = () => {
    this.setState({
      collapseClasses: "",
    });
  };

  render() {
    return (
      <>
        <header className="header-global">
          <Navbar
            className="navbar-main navbar-transparent navbar-dark headroom"
            expand="lg"
            id="navbar-main"
          >
            <Container>
              <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
                <img
                  alt="..."
                  src={require("assets/img/brand/cinefilia_wt.png")}
                />
              </NavbarBrand>
              <button className="navbar-toggler" id="navbar_global">
                <span className="navbar-toggler-icon" />
              </button>
              <UncontrolledCollapse
                toggler="#navbar_global"
                navbar
                className={this.state.collapseClasses}
                onExiting={this.onExiting}
                onExited={this.onExited}
              >
                <div className="navbar-collapse-header">
                <Row>
                    <Col className="collapse-brand" xs="6">
                      <Link to="/">
                        <img
                          alt="..."
                          src={require("assets/img/brand/cinefilia_blk.png")}
                        />
                      </Link>
                    </Col>
                    <Col className="collapse-close" xs="6">
                      <button className="navbar-toggler" id="navbar_global">
                        <span />
                        <span />
                      </button>
                    </Col>
                  </Row>
                </div>
                <Nav className="align-items-lg-center navbar-nav-hover" navbar>
                  <UncontrolledDropdown nav>
                    <DropdownToggle nav>
                      <i className="ni ni-collection d-lg-none mr-1" />
                      <span className="nav-link-inner--text">Películas</span>
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-right">
                      <DropdownItem to="/buscar" tag={Link}>
                        Buscar
                      </DropdownItem>
                      <DropdownItem to="/por-genero" tag={Link}>
                        Por géneros
                      </DropdownItem>
                      <DropdownItem to="/por-pais" tag={Link}>
                        Por país
                      </DropdownItem>
                      <DropdownItem to="/top-10" tag={Link}>
                        Top 10
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <UncontrolledDropdown nav>
                    <DropdownToggle nav>
                      <i className="ni ni-collection d-lg-none mr-1" />
                      <span className="nav-link-inner--text">Tus películas</span>
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-right">
                      <DropdownItem to="/tus-listas" tag={Link}>
                        Tus listas
                      </DropdownItem>
                      <DropdownItem to="/tus-favoritas" tag={Link}>
                        Tus favoritas
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
                <Nav className="align-items-lg-center ml-lg-auto" navbar>
                  <NavItem className="d-lg-none">
                    <Button
                      className="btn-neutral btn-icon"
                      color="default"
                      href="/profile-page"
                    >
                      <span className="btn-inner--icon">
                        <i className="fa fa-user mr-2" />
                      </span>
                      <span className="nav-link-inner--text ml-1">
                        Mi cuenta
                      </span>
                    </Button>
                  </NavItem>
                  <NavItem className="d-lg-none">
                    <Button
                      className="btn-1 ml-1"
                      color="danger"
                      href="/"
                    >
                      <span className="btn-inner--icon">
                        <i className="fa fa-sign-out mr-2" />
                      </span>
                      <span className="nav-link-inner--text ml-1">
                        Cerrar sesión
                      </span>
                    </Button>
                  </NavItem>
                  <NavItem className="d-none d-lg-block ml-lg-4">
                    <Button
                      className="btn-neutral btn-icon"
                      color="default"
                      href="/profile-page"
                    >
                      <span className="btn-inner--icon">
                        <i className="fa fa-user mr-2" />
                      </span>
                      <span className="nav-link-inner--text ml-1">
                        Mi cuenta
                      </span>
                    </Button>
                    <Button
                      className="btn-1 ml-1"
                      color="danger"
                      href="/"
                    >
                      <span className="btn-inner--icon">
                        <i className="fa fa-sign-out mr-2" />
                      </span>
                      <span className="nav-link-inner--text ml-1">
                        Cerrar sesión
                      </span>
                    </Button>
                  </NavItem>
                </Nav>
              </UncontrolledCollapse>
            </Container>
          </Navbar>
        </header>
      </>
    );
  }
}

export default NavBar_LoggedIn;
