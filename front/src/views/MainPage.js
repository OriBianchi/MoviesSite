/*!

=========================================================
* Argon Design System React - v1.1.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import { Container, Row, Badge, Col } from "reactstrap";

// core components
import SimpleFooter from "components/Footers/SimpleFooter.js";

// index page sections
import Search from "components/Custom/Main/Search.js";
import NavBar_LoggedOut from "components/Navbars/NavBar_LoggedOut.js";
import MovieCards from "components/Custom/Main/MovieCards.js";
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
        <NavBar_LoggedIn />
        <main ref="main">
          <Search />
          <br />
          <MovieCards />
        </main>

        <SimpleFooter />
      </>
    );
  }
}

export default Landing;
