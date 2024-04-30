import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardImg,
  Container,
  Row,
  Col,
} from "reactstrap";

class MovieCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
    };
  }

  componentDidMount() {
    // Fetch top-rated movie data from TMDb API
    fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=73a2526073ff49d6c8aa48eba5e42531')
      .then(response => response.json())
      .then(data => {
        this.setState({ movies: data.results.slice(0, 18) });
      })
      .catch(error => console.log('Error fetching data:', error));
  }

  render() {
    const { movies } = this.state;

    return (
      <Container className="container-fluid">
        <Row xs="2" sm="2" md="3">
          {movies.map((movie, index) => (
            <Col key={index} className="mb-3 mb-md-4">
              <Card className="card-lift--hover shadow border-0">
                <Link to={`/movie/${movie.id}`}>
                  <CardImg
                    alt={movie.title}
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  />
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

export default MovieCards;
