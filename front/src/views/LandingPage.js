
import React from "react";

// reactstrap components
import { Container, Row, Badge, Col } from "reactstrap";

// core components
import SimpleFooter from "components/Footers/SimpleFooter.js";

// index page sections
import Hero from "components/Custom/Landing/Hero.js";
import NavBar_LoggedOut from "components/Navbars/NavBar_LoggedOut.js";
import MovieCards from "components/Custom/Landing/MovieCards.js";
import LikesDislikes from "components/Custom/Animations/LikesDislikes.js";

class Landing extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  render() {
    return (
      <>
        <NavBar_LoggedOut />
        <main ref="main">
          <Hero />
          <br></br>
          <br></br>
          
          <Row className="row-grid align-items-center">
<Col className="order-md-1" md="6">
<LikesDislikes />
</Col>
<Col className="order-md-1" md="6">
  <div className="pr-md-5">
    <h2>¡Mira todo lo que podras hacer!</h2>
    <p style={{ fontSize: '17px' }}>
      En Cinefilia vas a poder de disfrutar de todas las siguientes funciones.
      <br></br>¡Unite ahora y descubre todo lo que tenemos para ofrecerte!
    </p>
    <Row className="row-grid align-items-center">
    <Col className="order-md-1" md="6">
    <ul className="list-unstyled mt-5" >
      <li className="py-2">
        <div className="d-flex align-items-center">
          <div>
            <Badge
              className="badge-circle mr-3"
              color="success"
            >
              <i className="ni ni-settings-gear-65" />
            </Badge>
          </div>
          <div>
            <h5 className="mb-0">
              Descubrí nuevas películas
            </h5>
          </div>
        </div>
      </li>
      <li className="py-2">
        <div className="d-flex align-items-center">
          <div>
            <Badge
              className="badge-circle mr-3"
              color="success"
            >
              <i className="ni ni-html5" />
            </Badge>
          </div>
          <div>
            <h5 className="mb-0"> Compartí tus reseñas </h5>
          </div>
        </div>
      </li>
      <li className="py-2">
        <div className="d-flex align-items-center">
          <div>
            <Badge
              className="badge-circle mr-3"
              color="success"
            >
              <i className="ni ni-html5" />
            </Badge>
          </div>
          <div>
            <h5 className="mb-0">Interactuá con la comunidad</h5>
          </div>
        </div>
      </li>
      
    </ul>


    </Col>
    <Col className="order-md-1" md="6">
    <ul className="list-unstyled mt-5">
      
      <li className="py-2">
        <div className="d-flex align-items-center">
          <div>
            <Badge
              className="badge-circle mr-3"
              color="success"
            >
              <i className="ni ni-html5" />
            </Badge>
          </div>
          <div>
            <h5 className="mb-0">Conoce más de tus peliculas favoritas</h5>
          </div>
        </div>
      </li>
      <li className="py-2">
        <div className="d-flex align-items-center">
          <div>
            <Badge
              className="badge-circle mr-3"
              color="success"
            >
              <i className="ni ni-satisfied" />
            </Badge>
          </div>
          <div>
            <h5 className="mb-0">
            Organiza tus peliculas en listas 
            </h5>
          </div>
        </div>
      </li>
      <li className="py-2">
        <div className="d-flex align-items-center">
          <div>
            <Badge
              className="badge-circle mr-3"
              color="success"
            >
              <i className="ni ni-satisfied" />
            </Badge>
          </div>
          <div>
            <h5 className="mb-0">
            y mucho más!
            </h5>
          </div>
        </div>
      </li>
    
    </ul>


      
    </Col>

    </Row>
    
  </div>
 
</Col>
</Row>
          
            <Row className="justify-content-center text-center mb-sm">
              
              <h2 className="display-3"><br></br>¡Miles de filmes te esperan!</h2>
              
            </Row>
          
          <section className="section">
            <MovieCards />
          </section>
        </main>
        <SimpleFooter />
      </>
    );
  }
}

export default Landing;

