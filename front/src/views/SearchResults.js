import React from "react";
import { Container, Row, Col, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import NavBar_LoggedIn from "components/Navbars/NavBar_LoggedIn";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import Search from "components/Custom/Main/Search.js";
import MovieCards from "components/Custom/Main/MovieCards.js";

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.mainRef = React.createRef();
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.mainRef.current.scrollTop = 0;
  }

  render() {
    return (
      <>
        <NavBar_LoggedIn />
        <main ref={this.mainRef}>
          <Search />
          <br />
          <Container>
            <Row className="row-grid align-items-center">
              <Col sm="10">
                <h3 className="h4 text-warning font-weight-bold mt-md">Resultados de la búsqueda "búsqueda":</h3>
              </Col>
              <Col sm="5">
              <small className="h4 text-muted font-weight-bold mt-md">20 resultados</small>
              </Col>
            </Row>
          </Container>
          <br />

          <MovieCards />
          <Row className="justify-content-center">
            <Col sm="auto">
              <nav aria-label="Page navigation example" className="mb-4">
                <Pagination>
                  <PaginationItem>
                    <PaginationLink
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem className="active">
                    <PaginationLink
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      2
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      3
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      4
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      5
                    </PaginationLink>
                  </PaginationItem>
                </Pagination>
              </nav>
            </Col>
          </Row>
          <br />
        </main>
        <SimpleFooter />
      </>
    );
  }
}

export default Landing;
