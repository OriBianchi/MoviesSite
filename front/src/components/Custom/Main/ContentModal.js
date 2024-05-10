import React, { useEffect, useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import "./ContentModal.css";
const formatRating = (rating) => {
  return `⭐ ${parseFloat(rating).toFixed(1)}`;
};
const ContentModal = ({ modalMovie, toggleModal }) => {
  const [video, setVideo] = useState(null);

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

  useEffect(() => {
    fetchVideo();
  }, [modalMovie]);

  if (!modalMovie) {
    return null;
  }


  return (
    <Modal isOpen={true} toggle={toggleModal} centered size="xl">
      <ModalBody>
        <div className="movie-details">
  <div className="poster" style={{ display: 'inline-block', marginRight: 20 }}>
    <img src={`https://image.tmdb.org/t/p/w300/${modalMovie.poster_path}`} alt="Movie Poster" />
  </div>
  <div className="info" style={{ display: 'inline-block' }}>
    <h2 className="movie-title">{modalMovie.title} ({modalMovie.release_date.slice(0, 4)})</h2>
    <p className="movie-rating">{formatRating(modalMovie.vote_average)}</p>
    <p className="movie-description">{modalMovie.overview}</p>
    
    <div className="movie-trailer">
      {video && (
        <iframe
        
          width="560"
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
