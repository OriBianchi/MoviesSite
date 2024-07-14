import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardImg,
  CardTitle,
  CardText,
  CardBody,
  Nav,
  NavItem,
  NavLink,
  Container,
  Row,
  Col,
} from "reactstrap";
import NavBar_LoggedIn from "components/Navbars/NavBar_LoggedIn.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import MovieCards from "components/Custom/Main/MovieCardsList.js";
import "components/Custom/Main/MovieCards.css";
import classnames from "classnames";

class MyLists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      circledNavPills: 1,
    };
  }

  componentDidMount() {
    // Parse query parameter to set the selected tab
    const searchParams = new URLSearchParams(window.location.search);
    const tab = searchParams.get("tab");
    switch (tab) {
      case "favoritas":
        this.setState({ circledNavPills: 1 });
        break;
      case "guardadas":
        this.setState({ circledNavPills: 2 });
        break;
      case "vistas":
        this.setState({ circledNavPills: 3 });
        break;
      default:
        this.setState({ circledNavPills: 1 });
    }
  }

  toggleNavs = (e, index) => {
    e.preventDefault();
    this.setState({
      circledNavPills: index,
    });
  };

  getTitle = () => {
    switch (this.state.circledNavPills) {
      case 1:
        return "Favoritas";
      case 2:
        return "Guardadas";
      case 3:
        return "Vistas";
      default:
        return "Favoritas";
    }
  };

  render() {
    return (
      <>
        <NavBar_LoggedIn />
        <main ref="main">
          <div className="position-relative">
            <section className="section section-hero section-shaped">
              {/* Background circles */}
              <div className="shape shape-style-1 shape-primary">
                {/*... */}
              </div>
              <Container className="shape-container d-flex align-items-center py-lg">
                <div className="col px-0">
                  <Row className="align-items-center justify-content-center">
                    <Col className="text-center" lg="8">
                      <p className="lead text-white">
                        Filtra entre tus películas...
                      </p>
                    </Col>
                  </Row>
                  <br></br>
                  <Row className="align-items-center justify-content-center d-flex justify-content-around">
                        <Nav
                          className="nav-pills-circle"
                          id="tabs_2"
                          pills
                          role="tablist"
                        >
                          <NavItem>
                            <NavLink
                              aria-selected={
                                this.state.circledNavPills === 1
                              }
                              className={classnames("rounded-circle", {
                                active: this.state.circledNavPills === 1,
                              })}
                              onClick={(e) => this.toggleNavs(e, 1)}
                              href="#pablo"
                              role="tab"
                            >
                              <span className="nav-link-icon d-block">
                                <i className="fa fa-heart" />
                              </span>
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              aria-selected={
                                this.state.circledNavPills === 2
                              }
                              className={classnames("rounded-circle", {
                                active: this.state.circledNavPills === 2,
                              })}
                              onClick={(e) => this.toggleNavs(e, 2)}
                              href="#pablo"
                              role="tab"
                            >
                              <span className="nav-link-icon d-block">
                                <i className="fa fa-bookmark" />
                              </span>
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              aria-selected={
                                this.state.circledNavPills === 3
                              }
                              className={classnames("rounded-circle", {
                                active: this.state.circledNavPills === 3,
                              })}
                              onClick={(e) => this.toggleNavs(e, 3)}
                              href="#pablo"
                              role="tab"
                            >
                              <span className="nav-link-icon d-block">
                                <i className="fa fa-eye" />
                              </span>
                            </NavLink>
                          </NavItem>
                        </Nav>
                  </Row>
                  <br></br>
                  <Row className="align-items-center justify-content-center">
                    <Col className="text-center" lg="10">
                      <p className="display-4 text-white">
                        {this.getTitle()}
                      </p>
                    </Col>
                  </Row>

                </div>
              </Container>
            </section>
          </div>

          <br></br>
          <br></br>
          
          <section className="section">
            {/* Pass listType prop based on the selected tab */}
            <MovieCards listType={this.state.circledNavPills === 1 ? "liked" : this.state.circledNavPills === 2 ? "bookmarked" : "seen"} />
          </section>
        </main>
        <SimpleFooter />
      </>
    );
  }
}

export default MyLists;
