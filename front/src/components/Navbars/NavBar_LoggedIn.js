import React from "react";
import { Link } from "react-router-dom";
import Headroom from "headroom.js";
import {
  Button,
  UncontrolledCollapse,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";

class NavBar_LoggedIn extends React.Component {
  componentDidMount() {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    headroom.init();
  }

  state = {
    collapseClasses: "",
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
              <NavbarBrand className="mr-lg-5" to="/main-page" tag={Link}>
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
                      <Link to="/main-page">
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
                <Nav className="navbar-nav-hover align-items-lg-center" navbar>
                  <UncontrolledDropdown nav>
                    <DropdownToggle nav>
                      <i className="ni ni-collection d-lg-none mr-1" />
                      <span className="nav-link-inner--text">
                      <Link to="/main-page">
                        Buscador de películas
                      </Link></span>
                    </DropdownToggle>
                    {/* <DropdownMenu>
                      <DropdownItem to="/main-page" tag={Link}>
                        Ver Todas
                      </DropdownItem>
                      <DropdownItem to="/buscar" tag={Link}>
                        Buscar
                      </DropdownItem>
                      <DropdownItem to="/profile-page" tag={Link}>
                        Por géneros
                      </DropdownItem>
                      <DropdownItem to="/login-page" tag={Link}>
                        Por país
                      </DropdownItem>
                      <DropdownItem to="/register-page" tag={Link}>
                        Top 10
                      </DropdownItem>
                    </DropdownMenu> */}
                  </UncontrolledDropdown>
                </Nav>
                <Nav className="navbar-nav-hover align-items-lg-center" navbar>
                  <UncontrolledDropdown nav>
                    <DropdownToggle nav>
                      <i className="ni ni-collection d-lg-none mr-1" />
                      <span className="nav-link-inner--text">
                        <Link to="/my-lists">
                          Listas
                        </Link>
                      </span>
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem to="/my-lists?tab=favoritas" tag={Link}>
                        ❤️ Favoritas
                      </DropdownItem>
                      <DropdownItem to="/my-lists?tab=guardadas" tag={Link}>
                        🔖 Guardadas
                      </DropdownItem>
                      <DropdownItem to="/my-lists?tab=vistas" tag={Link}>
                        👁‍🗨 Vistas
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
                <Nav className="align-items-lg-center ml-lg-auto" navbar>
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
