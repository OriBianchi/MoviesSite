import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardImg,
  CardTitle,
  CardText,
  CardBody,
  Container,
  Row,
  Col,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import NavBar_LoggedIn from "components/Navbars/NavBar_LoggedIn.js";
import classnames from "classnames";
import axios from "axios";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import MovieCards from "components/Custom/Main/MovieCards.js";
import "components/Custom/Main/MovieCards.css"; 

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchFocused: false,
      searchQuery: "",
      showResults: false,
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSearch = (event) => {
    this.setState({ searchQuery: event.target.value });
  }

  handleSubmit = () => {
    const { searchQuery } = this.state;
    if (searchQuery.trim() === '') {
      this.setState({ showResults: false });
      return;
    }
    axios.get(`https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=73a2526073ff49d6c8aa48eba5e42531`)
    .then(response => {
        this.setState({ showResults: true });
      })
    .catch(error => console.log('Error fetching data:', error));
  }

  render() {
    const { searchFocused, searchQuery, showResults } = this.state;
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
                    <Col className="text-center" lg="7">
                      <p className="lead text-white">
                        ¿Qué película estás buscando?
                      </p>
                      <FormGroup
                        className={classnames({
                          focused: searchFocused,
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
                            value={searchQuery}
                            onChange={this.handleSearch}
                            onFocus={() => this.setState({ searchFocused: true })}
                            onBlur={() => this.setState({ searchFocused: false })}
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
              </Container>
            </section>
          </div>

          <br></br>
          <br></br>
          
          <section className="section">
            <MovieCards searchQuery={searchQuery} />
          </section>
        </main>
        <SimpleFooter />
      </>
    );
  }
}

export default Search;
