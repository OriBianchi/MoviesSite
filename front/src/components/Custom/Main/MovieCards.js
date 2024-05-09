import React, { useEffect, useState } from "react";
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

const MovieCards = ({ searchQuery }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [likedMovies, setLikedMovies] = useState([]);
  const [watchListedMovies, setWatchListedMovies] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, [page, searchQuery]);

const fetchMovies = () => {
  const query = searchQuery ? `&query=${searchQuery}` : "";
  const apiUrl = searchQuery
    ? `https://api.themoviedb.org/3/search/movie?api_key=73a2526073ff49d6c8aa48eba5e42531${query}&page=${page}&language=es`
    : `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=73a2526073ff49d6c8aa48eba5e42531&page=${page}&language=es`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      setMovies(data.results);
      setTotalPages(data.total_pages);
    })
    .catch((error) => console.log("Error fetching data:", error));
};


  const formatRating = (rating) => {
    return `⭐ ${parseFloat(rating).toFixed(1)}`;
  };

  const toggleLike = (event, movieId) => {
    event.preventDefault();
    if (likedMovies.includes(movieId)) {
      setLikedMovies(likedMovies.filter((id) => id !== movieId));
    } else {
      setLikedMovies([...likedMovies, movieId]);
    }
  };

  const toggleWatchlist = (event, movieId) => {
    event.preventDefault();
    if (watchListedMovies.includes(movieId)) {
      setWatchListedMovies(watchListedMovies.filter((id) => id !== movieId));
    } else {
      setWatchListedMovies([...watchListedMovies, movieId]);
    }
  };

  const toggleSeen = (event, movieId) => {
    event.preventDefault();
    if (watchedMovies.includes(movieId)) {
      setWatchedMovies(watchedMovies.filter((id) => id !== movieId));
    } else {
      setWatchedMovies([...watchedMovies, movieId]);
    }
  };

  return (
    <Container fluid className="px-7">
      <Row xs="2" sm="3" md="5" lg="5">
        {movies.map((movie, index) => (
          <Col key={index} className="mb-2 mb-md-4">
            <Card className="shadow movie-card">
              <Link to={`/movie/${movie.id}`}>
                <div className="position-relative">
                  <CardImg
                    top
                    alt={movie.title}
                    src={movie.poster_path? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : 'https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg'}
                  />
                  <Row className="justify-content-center mt-1 align-items-center">
                    <Col xs="auto">
                      <div
                        className={`heart-icon ${likedMovies.includes(movie.id) ? "liked" : ""}`}
                        onClick={(e) => toggleLike(e, movie.id)}
                        title="Añadir a favoritos"
                      >
                        <i className="fa fa-heart" />
                      </div>
                    </Col>
                    <Col xs="auto" className="divider"></Col>
                    <Col xs="auto">
                      <div
                        className={`heart-icon ${watchListedMovies.includes(movie.id) ? "watchlisted" : ""}`}
                        onClick={(e) => toggleWatchlist(e, movie.id)}
                        title="Añadir a tu watchlist"
                      >
                        <i className="fa fa-bookmark" />
                      </div>
                    </Col>
                    <Col xs="auto" className="divider"></Col>
                    <Col xs="auto">
                      <div
                        className={`heart-icon ${watchedMovies.includes(movie.id) ? "seen" : ""}`}
                        onClick={(e) => toggleSeen(e, movie.id)}
                        title="Marcar como visto"
                      >
                        <i className="fa fa-eye" />
                      </div>
                    </Col>
                  </Row>
                  <hr className="mt-1 mb-1" /> {/* Adjusted margin top and bottom */}
                </div>
                <CardBody className="p-2 d-flex flex-column">
                  <div className="flex-grow-1">
                    <CardTitle className="text-center mb-1 mt-0 movie-title">
                      {movie.title}
                    </CardTitle>
                    <CardText className="text-center mb-1 mt-0">
                      ({new Date(movie.release_date).getFullYear()})
                    </CardText>
                    <CardText className="text-center mb-0 mt-0">
                      {formatRating(movie.vote_average)}
                    </CardText>
                  </div>
                </CardBody>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
      <Row className="justify-content-center mt-4">
        <Col xs="auto">
          <Button
            color="primary"
            onClick={() => setPage((prevPage) => prevPage - 1)}
            disabled={page === 1}
          >
            Previous
          </Button>
          <Button
            color="primary"
            onClick={() => setPage((prevPage) => prevPage + 1)}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default MovieCards;
