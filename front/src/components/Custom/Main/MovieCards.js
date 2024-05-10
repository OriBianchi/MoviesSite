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
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import "./MovieCards.css";
import ContentModal from "./ContentModal";

const MovieCards = ({ searchQuery, listType }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [likedMovies, setLikedMovies] = useState([]);
  const [watchListedMovies, setWatchListedMovies] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [modalMovie, setModalMovie] = useState(null);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [genreDropdownOpen, setGenreDropdownOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [languageSearchTerm, setLanguageSearchTerm] = useState("");
  const [ratingDropdownOpen, setRatingDropdownOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState(null);
  const [genreSearchTerm, setGenreSearchTerm] = useState("");

 
 
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
    fetchGenres();
    fetchLanguages();
    fetchMovies();
  }, [page, searchQuery, selectedGenres, selectedLanguages, selectedRating]);

  const fetchGenres = () => {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=73a2526073ff49d6c8aa48eba5e42531&language=es`)
      .then((response) => response.json())
      .then((data) => {
        setGenres(data.genres);
      })
      .catch((error) => console.log("Error fetching genres:", error));
  };
  

  const fetchLanguages = () => {
    fetch(`https://api.themoviedb.org/3/configuration/languages?api_key=73a2526073ff49d6c8aa48eba5e42531&language=es`)
      .then((response) => response.json())
      .then((data) => {
        setLanguages(data);
      })
      .catch((error) => console.log("Error fetching languages:", error));
  };

  const fetchMovies = () => {
    const query = searchQuery ? `&query=${searchQuery}` : "";
    const genreQuery = selectedGenres.length > 0 ? `&with_genres=${selectedGenres.join(",")}` : "";
    const languageQuery = selectedLanguages.length > 0 ? `&with_original_language=${selectedLanguages.join(",")}` : "";
    const ratingQuery = selectedRating ? `&vote_average.gte=${selectedRating}` : "";
    const apiUrl = searchQuery
      ? `https://api.themoviedb.org/3/search/movie?api_key=73a2526073ff49d6c8aa48eba5e42531${query}&page=${page}&language=es`
      : `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=73a2526073ff49d6c8aa48eba5e42531&page=${page}&language=es${genreQuery}${languageQuery}${ratingQuery}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results.slice(0, 18));
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

  const toggleRatingDropdown = () => {
    setRatingDropdownOpen((prevState) => !prevState);
  };

  const handleGenreSelect = (genreId) => {
    if (selectedGenres.includes(genreId)) {
      setSelectedGenres(selectedGenres.filter((id) => id !== genreId));
    } else {
      setSelectedGenres([...selectedGenres, genreId]);
    }
  };

  const handleLanguageSelect = (language) => {
    if (selectedLanguages.includes(language)) {
      setSelectedLanguages(selectedLanguages.filter((lang) => lang !== language));
    } else {
      setSelectedLanguages([...selectedLanguages, language]);
    }
  };

  const handleLanguageSearchChange = (event) => {
    setLanguageSearchTerm(event.target.value);
  };
  

  const handleRatingSelect = (rating) => {
    setSelectedRating(rating);
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
      
      <Row className="mb-4">
        <Col>
          <Dropdown isOpen={genreDropdownOpen} toggle={toggleGenreDropdown}>
            <DropdownToggle caret>
              {selectedGenres.length === 0 ? "Todos los Géneros" : `${selectedGenres.length} genres selected`}
            </DropdownToggle>
            <DropdownMenu>
            <DropdownItem>
                <input
                type="text"
                placeholder="Buscar género"
                value={genreSearchTerm}
                onChange={(e) => setGenreSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                 />
                 </DropdownItem>

              <DropdownItem onClick={() => setSelectedGenres([])}>Limpiar selcción</DropdownItem>
              {genres
              .filter((genre) =>
              genre.name.toLowerCase().includes(genreSearchTerm.toLowerCase())
            )
            .map((genre) => (
                <DropdownItem
                  key={genre.id}
                  onClick={() => handleGenreSelect(genre.id)}
                  style={{ backgroundColor: selectedGenres.includes(genre.id) ? "#f0f0f0" : "transparent" }}
                >
                  {genre.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </Col>
        <Col>
          <Dropdown isOpen={languageDropdownOpen} toggle={toggleLanguageDropdown}>
            <DropdownToggle caret>
              {selectedLanguages.length === 0 ? "Todos los idiomas" : `${selectedLanguages.length} languages selected`}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>
                <input
                  type="text"
                  placeholder="Buscar idioma"
                  value={languageSearchTerm}
                  onChange={handleLanguageSearchChange}
                  onClick={(e) => e.stopPropagation()}
                />
              </DropdownItem>
              <DropdownItem onClick={() => setSelectedLanguages([])}>Limpiar selcción</DropdownItem>
              <DropdownItem divider />
              {filteredLanguages.map((language) => (
                <DropdownItem
                  key={language.iso_639_1}
                  onClick={() => handleLanguageSelect(language.iso_639_1)}
                  style={{ backgroundColor: selectedLanguages.includes(language.iso_639_1) ? "#f0f0f0" : "transparent" }}
                >
                  {language.english_name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </Col>
        <Col>
          <Dropdown isOpen={ratingDropdownOpen} toggle={toggleRatingDropdown}>
            <DropdownToggle caret>
              {selectedRating ? `Rating: ${selectedRating} or more` : "Rating"}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => handleRatingSelect(null)}>Todo</DropdownItem>
              {[4, 5, 6, 7, 8, 9].map((rating) => (
                <DropdownItem
                  key={rating}
                  onClick={() => handleRatingSelect(rating)}
                  style={{ backgroundColor: selectedRating === rating ? "#f0f0f0" : "transparent" }}
                >
                  {rating} o más
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </Col>
      </Row>
      <Row xs="2" sm="3" md="4" lg="5">
        {filteredMovies.map((movie, index) => (
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
                  <hr className="mt-1 mb-1" />{" "}
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
      <Row className="justify-content-center mt-4">
        <Col xs="auto">
          <Button
            color="primary"
            onClick={() => {
              setPage((prevPage) => prevPage - 1);
              window.scrollTo(0, 0);
            }}
            disabled={page === 1}
          >
            Previous
          </Button>
          <Button
            color="primary"
            onClick={() => {
              setPage((prevPage) => prevPage + 1);
              window.scrollTo(0, 0);
            }}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </Col>
      </Row>
      <ContentModal modalMovie={modalMovie} toggleModal={closeModal} />
    </Container>
  );
};

export default MovieCards;