import React, { useEffect, useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import "./ContentModal.css";

const formatRating = (rating) => {
  return `⭐ ${parseFloat(rating).toFixed(1)}`;
};

const ContentModal = ({ modalMovie, toggleModal }) => {
  const [video, setVideo] = useState(null);
  const [genres, setGenres] = useState([]);
  const [language, setLanguage] = useState("");

  const languageNames = {
    en: "English",
    es: "Spanish",
    // Agrega otros idiomas según sea necesario
  };

  const fetchVideo = async () => {
    if (!modalMovie) return;
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${modalMovie.id}/videos?api_key=73a2526073ff49d6c8aa48eba5e42531`
    );
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      setVideo(data.results[0].key);
    }
  };

  const fetchGenres = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${modalMovie.id}?api_key=73a2526073ff49d6c8aa48eba5e42531&language=es`
    );
    const data = await response.json();
    if (data.genres) {
      setGenres(data.genres);
    }
  };

  const fetchLanguage = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/configuration/languages?api_key=73a2526073ff49d6c8aa48eba5e42531`
    );
    const data = await response.json();
    const languageData = data.find((lang) => lang.iso_639_1 === modalMovie.original_language);
    if (languageData) {
      setLanguage(languageNames[languageData.iso_639_1] || languageData.english_name);
    }
  };

  useEffect(() => {
    fetchVideo();
    if (modalMovie) {
      fetchGenres();
      fetchLanguage();
    }
  }, [modalMovie]);

  if (!modalMovie) {
    return null;
  }

  return (
    <Modal isOpen={true} toggle={toggleModal} centered size="xl">
      <ModalBody>
        <button className="close-button" onClick={toggleModal}>
          <span aria-hidden="true">&times;</span>
        </button>
        <div className="movie-details">
          <div className="poster">
          <img src={`https://image.tmdb.org/t/p/w300/${modalMovie.poster_path}`} alt="Movie Poster" style={{ marginRight: 10 }} />
          </div>
          <div className="info">
            <h2 className="movie-title">{modalMovie.title} ({modalMovie.release_date.slice(0, 4)})</h2>
            <p className="movie-rating">{formatRating(modalMovie.vote_average)}</p>
            <p className="movie-language">Idioma: {language}</p>
            <p className="movie-genres">
              Géneros: {genres.map((genre) => genre.name).join(", ")}
            </p>
            <p className="movie-description">{modalMovie.overview}</p>
            <div className="movie-trailer">
              {video && (
                <iframe
                  width="100%"
                  height="315"
                  src={`https://www.youtube.com/embed/${video}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ContentModal;