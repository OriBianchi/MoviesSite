
import React from "react";

// reactstrap components
import { Container, Row, Badge, Col } from "reactstrap";

// core components
import SimpleFooter from "components/Footers/SimpleFooter.js";

// index page sections
import Buscar from "views/Buscar.js";
import LikesDislikes from "components/Custom/Animations/LikesDislikes.js";
import NavBar_LoggedIn from "components/Navbars/NavBar_LoggedIn";

class Landing extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  render() {
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
