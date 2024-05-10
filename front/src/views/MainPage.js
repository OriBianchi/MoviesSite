
import React from "react";
import { Container, Row, Col } from "reactstrap";
import NavBar_LoggedIn from "components/Navbars/NavBar_LoggedIn";
import SimpleFooter from "components/Footers/SimpleFooter.js";

// index page sections
import Buscar from "views/Buscar.js";
import LikesDislikes from "components/Custom/Animations/LikesDislikes.js";

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
    };
  }

  componentDidMount() {
    // Specify the desired language (e.g., "en" for English, "es" for Spanish)
    const language = "es";

    // Fetch top-rated movie data from TMDb API with the specified language
    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=73a2526073ff49d6c8aa48eba5e42531&language=${language}`
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ movies: data.results.slice(0, 20) });
      })
      .catch((error) => console.log("Error fetching data:", error));
  }

  render() {
    const { movies } = this.state;

    return (
      <>
        <main ref="main">
          <Buscar />
        </main>

       
      </>
    );
  }
}

export default Landing;
