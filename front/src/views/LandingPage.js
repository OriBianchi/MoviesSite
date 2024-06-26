import React from "react";
import { Container, Row, Badge, Col } from "reactstrap";
import SimpleFooter from "components/Footers/SimpleFooter.js";
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
          <br />
          <br />

          <Row className="row-grid align-items-center">
            {/* Conditional rendering for LikesDislikes */}
            <Col className="order-md-1 mb-4 mb-md-0 d-none d-md-block" md="6">
              <LikesDislikes />
            </Col>
            <Col className="order-md-2 mb-4 mb-md-0" md="6">
              <div className="pr-md-5 pl-md-5">
                <h2>¡Mira todo lo que podrás hacer!</h2>
                <p style={{ fontSize: "17px" }}>
                  En Cinefilia vas a poder disfrutar de todas las siguientes
                  funciones.
                  <br />
                  ¡Únete ahora y descubre todo lo que tenemos para ofrecerte!
                </p>
                <Row className="row-grid align-items-center">
                  <Col className="order-md-1 mb-4 mb-md-0" md="6">
                    <ul className="list-unstyled mt-5">
                      <li className="py-2">
                        <div className="d-flex align-items-center">
                          <div>
                            <Badge
                              className="badge-circle mr-3"
                              color="success"
                            >
                              <i className="ni " />
                            </Badge>
                          </div>
                          <div>
                            <h5 className="mb-0">
                              Descubre nuevas películas
                            </h5>
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
                              <i className="ni bold-right" />
                            </Badge>
                          </div>
                          <div>
                            <h5 className="mb-0">
                              Guarda las que te interesen
                            </h5>
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
                              <i className="ni" />
                            </Badge>
                          </div>
                          <div>
                            <h5 className="mb-0">
                              Lleva un registro de tus películas vistas
                            </h5>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>

          <Row className="justify-content-center text-center mb-sm">
            <h2 className="display-3">
              <br />
              ¡Miles de filmes te esperan!
            </h2>
          </Row>

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
