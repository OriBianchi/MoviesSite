
import React from "react";
import { Link } from "react-router-dom";

// reactstrap components
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

// core components
import SimpleFooter from "components/Footers/SimpleFooter.js";

// index page sections

import NavBar_LoggedIn from "components/Navbars/NavBar_LoggedIn.js";
import classnames from "classnames";
import axios from "axios";
import MovieCards from "components/Custom/Main/MovieCards.js";
import "components/Custom/Main/MovieCards.css"; 



class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchFocused: false,
      searchQuery: "",
      movies: [],
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
        this.setState({ movies: response.data.results, showResults: true });
      })
    .catch(error => console.log('Error fetching data:', error));
  }
  formatRating = (rating) => {
    return `⭐ ${parseFloat(rating).toFixed(1)}`;
  }
  render() {
    const { searchFocused, searchQuery, showResults, movies } = this.state;
    return (
      <>
        <NavBar_LoggedIn />
       <main ref="main">
        
  <>
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
                ¿Qué película estás buscando??
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
                <div className="btn-wrapper mt-1">
                  <Button
                    className="btn-white btn-icon mb-3 mb-sm-0"
                    color="default"
                    size="lg"
                    onClick={this.handleSubmit}
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
  
  <br></br>
  <br></br>
  
  <section className="section">
    {showResults ? (
      <Container fluid ref={this.containerRef} className="px-7">
        <Row xs="2" sm="3" md="5" lg="5">
          {movies.map((movie, index) => (
            <Col key={movie.id} className="mb-3 mb-md-4">
              <Card className="shadow movie-card">
                <Link to={`/movie/${movie.id}`}>
                  <CardImg
                    alt={movie.title}
                    src={movie.poster_path? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg'}
                  />
                  <CardBody className="p-2 d-flex flex-column">
                    <div className="flex-grow-1">
                      <CardTitle className="text-center mb-1 mt-0 movie-title">{movie.title}</CardTitle>
                      <CardText className="text-center mb-1 mt-0">
                        ({new Date(movie.release_date).getFullYear()})
                      </CardText>
                      <CardText className="text-center mb-0 mt-0">
                        {this.formatRating(movie.vote_average)}
                      </CardText>
                    </div>
                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    ) : (
      <MovieCards />
    )}
  </section>
        </main>
        <SimpleFooter />
      </>
    );
  }
}

export default Search;

