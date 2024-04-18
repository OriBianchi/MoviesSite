/*!

=========================================================
* Argon Design System React - v1.1.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import { Container, Row, Badge, Col } from "reactstrap";

// core components
import SimpleFooter from "components/Footers/SimpleFooter.js";

// index page sections
import Hero from "components/Custom/Landing/Hero.js";
import NavBar_LoggedOut from "components/Navbars/NavBar_LoggedOut.js";
import MovieCards from "components/Custom/Landing/MovieCards.js";
import LikesDislikes from "components/Custom/Animations/LikesDislikes.js";

class Landing extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  render() {
    return (
      <>
        <NavBar_LoggedOut />
        <main ref="main">
          <Hero />
          <br></br>
          <br></br>
          <Container>
            <Row className="row-grid align-items-center">
              <Col className="order-md-1" md="6">
              <LikesDislikes />
              </Col>
              <Col className="order-md-1" md="6">
                <div className="pr-md-5">
                  <h3>Awesome features</h3>
                  <p>
                    The kit comes with three pre-built pages to help you get
                    started faster. You can change the text and images and
                    you're good to go.
                  </p>
                  <ul className="list-unstyled mt-5">
                    <li className="py-2">
                      <div className="d-flex align-items-center">
                        <div>
                          <Badge
                            className="badge-circle mr-3"
                            color="success"
                          >
                            <i className="ni ni-settings-gear-65" />
                          </Badge>
                        </div>
                        <div>
                          <h6 className="mb-0">
                            Compartí tus reseñas
                          </h6>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="d-flex align-items-center">
                        <div>
                          <Badge
                            className="badge-circle mr-3"
                            color="success"
                          >
                            <i className="ni ni-html5" />
                          </Badge>
                        </div>
                        <div>
                          <h6 className="mb-0">Interactuá con la comunidad</h6>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="d-flex align-items-center">
                        <div>
                          <Badge
                            className="badge-circle mr-3"
                            color="success"
                          >
                            <i className="ni ni-satisfied" />
                          </Badge>
                        </div>
                        <div>
                          <h6 className="mb-0">
                            Descubrí nuevas películas
                          </h6>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <br></br>
              </Col>
            </Row>
            <Row className="justify-content-center text-center mb-sm">
              <h2 className="display-3">¡Miles de filmes te esperan!</h2>
            </Row>
          </Container>
          <section className="section">
            <MovieCards />
          </section>
        </main>
        <SimpleFooter />
      </>
    );
  }
}

export default Landing;
