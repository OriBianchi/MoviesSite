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
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

class NavBar_LoggedOut extends React.Component {
  componentDidMount() {
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
                <Nav className="align-items-lg-center ml-lg-auto" navbar>
                  <NavItem className="ml-lg-4">
                    <Button
                      className="btn-neutral btn-icon d-md-none"
                      color="default"
                      href="/register"
                    >
                      <span className="nav-link-inner--text ml-1">Registro</span>
                    </Button>
                    <Button
                      className="btn-1 d-md-none"
                      color="primary"
                      href="/login"
                    >
                      <span className="nav-link-inner--text ml-1">Iniciar sesión</span>
                    </Button>
                    <Button
                      className="btn-neutral btn-icon d-none d-md-inline-block"
                      color="default"
                      href="/register"
                    >
                      <span className="nav-link-inner--text ml-1">Registro</span>
                    </Button>
                    <Button
                      className="btn-1 d-none d-md-inline-block"
                      color="primary"
                      href="/login"
                    >
                      <span className="nav-link-inner--text ml-1">Iniciar sesión</span>
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

export default NavBar_LoggedOut;
