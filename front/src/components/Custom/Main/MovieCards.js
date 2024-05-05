import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardImg,
  CardBody,
  Container,
  Row,
  Col,
  Button,
  CardText,
  CardTitle,

} from "reactstrap";
import "./MovieCards.css"; 

class MovieCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      page: 1,
      total_pages: 0,
      searchQuery: "",
    };
    this.prevPage = this.prevPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.fetchMovies = this.fetchMovies.bind(this);
    this.containerRef = React.createRef();
  }

  componentDidMount() {
    this.fetchMovies();
  }

  prevPage = () => {
    if (this.state.page > 1) {
      this.setState({ page: this.state.page - 1 }, () => {
        this.fetchMovies();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  };

  nextPage = () => {
    if (this.state.page < this.state.total_pages) {
      this.setState({ page: this.state.page + 1 }, () => {
        this.fetchMovies();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  };

  fetchMovies = () => {
    const { searchQuery } = this.props;
    const query = searchQuery? `&query=${searchQuery}` : "";
    fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=73a2526073ff49d6c8aa48eba5e42531${query}&page=${this.state.page}`)
.then(response => response.json())
.then(data => {
          this.setState({ movies: data.results, total_pages: data.total_pages });
        })
.catch(error => console.log('Error fetching data:', error));
  };

  formatRating = (rating) => {
    return `⭐ ${parseFloat(rating).toFixed(1)}`;
  }

  render() {
    const { movies } = this.state;

    return (
      <Container fluid ref={this.containerRef} className="px-7">
        <Row xs="2" sm="3" md="5" lg="5">
          {movies.map((movie, index) => (
            <Col key={index} className="mb-2 mb-md-4">
              <Card className="shadow movie-card" >
                <Link to={`/movie/${movie.id}`}>
                  <div className="position-relative">
                    <CardImg
                    top
                      alt={movie.title}
                      src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} />
                  </div>
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
        <Row className="justify-content-center mt-4">
          <React.Fragment>
            <Col xs="auto">
              {/* Added <> </> here */}
              <>
                <Button color="primary" onClick={this.prevPage} disabled={this.state.page === 1}>Previous</Button>
                <Button color="primary" onClick={this.nextPage} disabled={this.state.page === this.state.total_pages}>Next</Button>
              </>
            </Col>
          </React.Fragment>
        </Row>
      </Container>
    );
  }
}

export default MovieCards;