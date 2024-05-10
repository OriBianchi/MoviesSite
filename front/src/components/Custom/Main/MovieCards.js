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

const MovieCards = ({ searchQuery, listType }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [likedMovies, setLikedMovies] = useState([]);
  const [watchListedMovies, setWatchListedMovies] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState([]);

  useEffect(() => {
    // Retrieve liked movies from local storage
    const storedLikedMovies = JSON.parse(localStorage.getItem("likedMovies")) || [];
    setLikedMovies(storedLikedMovies);

    // Retrieve watchlisted movies from local storage
    const storedWatchListedMovies = JSON.parse(localStorage.getItem("watchListedMovies")) || [];
    setWatchListedMovies(storedWatchListedMovies);

    // Retrieve watched movies from local storage
    const storedWatchedMovies = JSON.parse(localStorage.getItem("watchedMovies")) || [];
    setWatchedMovies(storedWatchedMovies);

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
        setMovies(data.results.slice(0, 18)); // Limit to the first 18 movies
        setTotalPages(data.total_pages);
      })
      .catch((error) => console.log("Error fetching data:", error));
  };

  const formatRating = (rating) => {
    return `⭐ ${parseFloat(rating).toFixed(1)}`;
  };

  const toggleLike = (event, movieId) => {
    event.preventDefault();
    const updatedLikedMovies = likedMovies.includes(movieId)
      ? likedMovies.filter((id) => id !== movieId)
      : [...likedMovies, movieId];
    setLikedMovies(updatedLikedMovies);
    localStorage.setItem("likedMovies", JSON.stringify(updatedLikedMovies));
    console.log("Updated Liked Movies:", updatedLikedMovies);
  };

  const toggleWatchlist = (event, movieId) => {
    event.preventDefault();
    const updatedWatchListedMovies = watchListedMovies.includes(movieId)
      ? watchListedMovies.filter((id) => id !== movieId)
      : [...watchListedMovies, movieId];
    setWatchListedMovies(updatedWatchListedMovies);
    localStorage.setItem("watchListedMovies", JSON.stringify(updatedWatchListedMovies));
    console.log("Updated WatchListed Movies:", updatedWatchListedMovies);
  };

  const toggleSeen = (event, movieId) => {
    event.preventDefault();
    const updatedWatchedMovies = watchedMovies.includes(movieId)
      ? watchedMovies.filter((id) => id !== movieId)
      : [...watchedMovies, movieId];
    setWatchedMovies(updatedWatchedMovies);
    localStorage.setItem("watchedMovies", JSON.stringify(updatedWatchedMovies));
    console.log("Updated Watched Movies:", updatedWatchedMovies);
  };

  // Adjusted column settings based on screen size
  const columnSettings = {
    xs: 12,
    sm: 6,
    md: 4,
    lg: 3,
    xl: 2,
  };

  // Filter movies based on listType
  let filteredMovies;
  switch (listType) {
    case "liked":
      filteredMovies = movies.filter((movie) => likedMovies.includes(movie.id));
      break;
    case "bookmarked":
      filteredMovies = movies.filter((movie) => watchListedMovies.includes(movie.id));
      break;
    case "seen":
      filteredMovies = movies.filter((movie) => watchedMovies.includes(movie.id));
      break;
    default:
      filteredMovies = movies;
  }

  return (
    <Container fluid className="px-7">
      <div className="text-center mb-3">
        Mostrando {filteredMovies.length} películas de {totalPages * 20}
      </div>
      <Row xs="1" sm="2" md="3" lg="4" xl="5">
        {filteredMovies.map((movie, index) => (
          <Col key={index} className="mb-2 mb-md-4" {...columnSettings}>
            <Card className="shadow movie-card">
              <Link to={`/movie/${movie.id}`}>
                <div className="position-relative">
                  <CardImg
                    top
                    alt={movie.title}
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                        : "https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg"
                    }
                  />
                  <Row className="justify-content-center mt-1">
                    <Col xs="auto">
                      <div
                        className={`heart-icon ${
                          likedMovies.includes(movie.id) ? "liked" : ""
                        }`}
                        onClick={(e) => toggleLike(e, movie.id)}
                        title="Añadir a favoritos"
                      >
                        <i className="fa fa-heart" />
                      </div>
                    </Col>
                    <Col xs="auto">
                      <div
                        className={`heart-icon ${
                          watchListedMovies.includes(movie.id)
                            ? "watchlisted"
                            : ""
                        }`}
                        onClick={(e) => toggleWatchlist(e, movie.id)}
                        title="Añadir a tu watchlist"
                      >
                        <i className="fa fa-bookmark" />
                      </div>
                    </Col>
                    <Col xs="auto">
                      <div
                        className={`heart-icon ${
                          watchedMovies.includes(movie.id) ? "seen" : ""
                        }`}
                        onClick={(e) => toggleSeen(e, movie.id)}
                        title="Marcar como visto"
                      >
                        <i className="fa fa-eye" />
                      </div>
                    </Col>
                  </Row>
                  <hr className="mt-1 mb-1" />{" "}
                  {/* Adjusted margin top and bottom */}
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
