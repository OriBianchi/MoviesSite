import React, { useEffect, useState } from "react";
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
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import "./MovieCards.css";
import ContentModal from "./ContentModal";

const MovieCards = ({ searchQuery, listType }) => {
  const [movies, setMovies] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);
  const [watchListedMovies, setWatchListedMovies] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [modalMovie, setModalMovie] = useState(null);
  const [genres, setGenres] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [genreDropdownOpen, setGenreDropdownOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [languageSearchTerm, setLanguageSearchTerm] = useState("");
  const [genreSearchTerm, setGenreSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGenres();
    fetchLanguages();
    fetchUserMovieLists();
  }, [listType]);

  const fetchGenres = () => {
    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=73a2526073ff49d6c8aa48eba5e42531&language=es`
    )
      .then((response) => response.json())
      .then((data) => {
        setGenres(data.genres);
      })
      .catch((error) => console.log("Error fetching genres:", error));
  };

  const fetchLanguages = () => {
    fetch(
      `https://api.themoviedb.org/3/configuration/languages?api_key=73a2526073ff49d6c8aa48eba5e42531&language=es`
    )
      .then((response) => response.json())
      .then((data) => {
        setLanguages(data);
      })
      .catch((error) => console.log("Error fetching languages:", error));
  };

  const fetchUserMovieLists = () => {
    const listEndpoints = {
      liked: "likedMovies",
      bookmarked: "savedMovies",
      seen: "seenMovies",
    };

    const fetchList = (endpoint) => {
      return fetch(`http://localhost:5000/api/users/user/get/${endpoint}`, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      }).then((response) => response.json());
    };

    fetchList(listEndpoints[listType])
      .then((data) => {
        const movieIds = Array.isArray(data) ? data.map(Number) : [];
        fetchMoviesByIds(movieIds);
        if (listType === "liked") {
          setLikedMovies(movieIds);
        } else if (listType === "bookmarked") {
          setWatchListedMovies(movieIds);
        } else if (listType === "seen") {
          setWatchedMovies(movieIds);
        }
      })
      .catch((error) => console.log(`Error fetching ${listType} movies:`, error));
  };

  const fetchMoviesByIds = (movieIds) => {
    const promises = movieIds.map((id) =>
      fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=73a2526073ff49d6c8aa48eba5e42531&language=es`).then(
        (response) => response.json()
      )
    );

    Promise.all(promises)
      .then((movies) => {
        setMovies(movies);
        setLoading(false);
      })
      .catch((error) => console.log("Error fetching movies by IDs:", error));
  };

  const toggleLike = (event, movieId) => {
    event.preventDefault();
    setLikedMovies((prevLikedMovies) => {
      const isLiked = prevLikedMovies.includes(movieId);
      const updatedLikedMovies = isLiked
        ? prevLikedMovies.filter((id) => id !== movieId)
        : [...prevLikedMovies, movieId];

      if (isLiked) {
        removeMovieFromList("likedMovies", movieId);
      } else {
        addMovieToList("likedMovies", movieId);
      }

      return updatedLikedMovies;
    });
  };

  const toggleWatchlist = (event, movieId) => {
    event.preventDefault();
    setWatchListedMovies((prevWatchListedMovies) => {
      const isWatchListed = prevWatchListedMovies.includes(movieId);
      const updatedWatchListedMovies = isWatchListed
        ? prevWatchListedMovies.filter((id) => id !== movieId)
        : [...prevWatchListedMovies, movieId];

      if (isWatchListed) {
        removeMovieFromList("savedMovies", movieId);
      } else {
        addMovieToList("savedMovies", movieId);
      }

      return updatedWatchListedMovies;
    });
  };

  const toggleSeen = (event, movieId) => {
    event.preventDefault();
    setWatchedMovies((prevWatchedMovies) => {
      const isSeen = prevWatchedMovies.includes(movieId);
      const updatedWatchedMovies = isSeen
        ? prevWatchedMovies.filter((id) => id !== movieId)
        : [...prevWatchedMovies, movieId];

      if (isSeen) {
        removeMovieFromList("seenMovies", movieId);
      } else {
        addMovieToList("seenMovies", movieId);
      }

      return updatedWatchedMovies;
    });
  };

  const addMovieToList = (listType, movieID) => {
    fetch(`http://localhost:5000/api/users/user/add/${listType}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ movieId: movieID }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(`ADDED TO ${listType} movies:`, data);
      })
      .catch((error) => console.log(`Error updating ${listType} movies:`, error));
  };

  const removeMovieFromList = (listType, movieID) => {
    fetch(`http://localhost:5000/api/users/user/delete/${listType}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ movieId: movieID }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(`REMOVED FROM ${listType} movies:`, data);
      })
      .catch((error) => console.log(`Error updating ${listType} movies:`, error));
  };

  const formatRating = (rating) => {
    return `⭐ ${parseFloat(rating).toFixed(1)}`;
  };

  const openModal = (movie) => {
    setModalMovie(movie);
  };

  const closeModal = () => {
    setModalMovie(null);
  };

  const toggleGenreDropdown = () => {
    setGenreDropdownOpen((prevState) => !prevState);
  };

  const toggleLanguageDropdown = () => {
    setLanguageDropdownOpen((prevState) => !prevState);
  };

  const handleLanguageSearchChange = (event) => {
    setLanguageSearchTerm(event.target.value);
  };

  const filteredLanguages = languages.filter((language) =>
    language.english_name.toLowerCase().includes(languageSearchTerm.toLowerCase())
  );

  const columnSettings = {
    xs: 12,
    sm: 6,
    md: 4,
    lg: 3,
    xl: 2,
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container fluid className="px-7">
      <Row className="mb-4">
      </Row>
      <Row xs="2" sm="3" md="4" lg="5">
        {movies.map((movie, index) => (
          <Col key={index} className="mb-2 mb-md-4" {...columnSettings}>
            <Card className="shadow movie-card">
              <div className="position-relative">
                <CardImg
                  onClick={() => openModal(movie)}
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
                <hr className="mt-1 mb-1" />
              </div>
              <CardBody className="p-2 d-flex flex-column" onClick={() => openModal(movie)}>
                <div className="flex-grow-1">
                  <CardTitle className="text-center mb-1 mt-0 movie-title">{movie.title}</CardTitle>
                  <CardText className="text-center mb-1 mt-0">
                    ({new Date(movie.release_date).getFullYear()})
                  </CardText>
                  <CardText className="text-center mb-0 mt-0">{formatRating(movie.vote_average)}</CardText>
                </div>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
      <ContentModal modalMovie={modalMovie} toggleModal={closeModal} />
    </Container>
  );
};

export default MovieCards;
