import React from "react";
import classnames from "classnames";

// reactstrap components
import {
  Button,
  Container,
  Row,
  Col,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchFocused: false,
    };
  }

  render() {
    return (
      <>
        <div className="position-relative">
          <section className="section section-hero section-shaped">
            {/* Background circles */}
            <div className="shape shape-style-1 shape-primary">
              <span className="span-150" />
              <span className="span-50" />
              <span className="span-50" />
              <span className="span-75" />
              <span className="span-100" />
              <span className="span-75" />
              <span className="span-50" />
              <span className="span-100" />
              <span className="span-50" />
              <span className="span-100" />
            </div>
            <Container className="shape-container d-flex align-items-center py-lg">
              <div className="col px-0">
                <Row className="align-items-center justify-content-center">
                  <Col className="text-center" lg="7">
                    <p className="lead text-white">
                      Qué película estás buscando?
                    </p>
                      <FormGroup
                        className={classnames({
                          focused: this.state.searchFocused,
                        })}
                      >
                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-zoom-split-in" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Buscar películas por título..."
                            type="text"
                            onFocus={() => this.setState({ searchFocused: true })}
                            onBlur={() => this.setState({ searchFocused: false })}
                          />
                        </InputGroup>
                      </FormGroup>
                    <div className="btn-wrapper mt-1">
                      <Button
                        className="btn-white btn-icon mb-3 mb-sm-0"
                        color="default"
                        href="/search-results"
                        size="lg"
                      >
                        <span className="btn-inner--text">Buscar</span>
                      </Button>
                    </div>
                  </Col>
                </Row>
              </div>
            </Container>
          </section>
        </div>
      </>
    );
  }
}

export default Search;
