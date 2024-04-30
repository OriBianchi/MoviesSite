import React from "react";
import { Card, CardImg, CardBody, CardTitle, CardText, Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "./MovieCards.css"; // Import CSS file for styling

class MovieCards extends React.Component {
  render() {
    const { movie } = this.props;

    // Extracting year from release_date
    const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : "";

    // Formatting rating to display only two decimal places
    const formattedRating = movie.vote_average.toFixed(2);

    return (
      <Col>
        <Card className="shadow movie-card">
          <Link to={`/movie/${movie.id}`}>
            <div className="position-relative">
              <CardImg
                top
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
              />
            </div>
            <CardBody className="p-2 d-flex flex-column">
              <div className="flex-grow-1">
                <CardTitle className="text-center mb-1 mt-0 movie-title">{movie.title}</CardTitle>
                <CardText className="text-center mb-1 mt-0">
                  ({releaseYear})
                </CardText>
                <CardText className="text-center mb-0 mt-0">
                ⭐ {formattedRating}
                </CardText>
              </div>
            </CardBody>
          </Link>
        </Card>
      </Col>
    );
  }
}

export default MovieCards;
