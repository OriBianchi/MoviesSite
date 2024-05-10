import React from "react";
import {
  Button,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

class SimpleFooter extends React.Component {
  render() {
    return (
      <footer className="footer">
        <Container>
              <div className="d-flex justify-content-center">
                <Button
                  className="btn-icon-only rounded-circle ml-1"
                  color="facebook"
                  href="https://www.linkedin.com/in/orianacbianchi/"
                  id="tooltip837440414"
                  target="_blank"
                >
                  <span className="btn-inner--icon">
                    <i className="fa fa-linkedin" />
                  </span>
                </Button>
                <UncontrolledTooltip delay={0} target="tooltip837440414">
                  Follow Ori
                </UncontrolledTooltip>
                <Button
                  className="btn-icon-only rounded-circle ml-1"
                  color="facebook"
                  href="https://www.linkedin.com/in/pazgiacchino/"
                  id="tooltip829810202"
                  target="_blank"
                >
                  <span className="btn-inner--icon">
                    <i className="fa fa-linkedin" />
                  </span>
                </Button>
                <UncontrolledTooltip delay={0} target="tooltip829810202">
                Follow Paz
                </UncontrolledTooltip>
                
              </div>
              
              
              
          <hr />
          <Row className="align-items-center justify-content-md-between">
            <Col md="6" className="text-center text-md-left">
              <div className="copyright">
                © 2024 - 2024 by Paz y Ori.
                
              </div>
            </Col>
            <Col md="6">
              <Nav className="nav-footer justify-content-center justify-content-md-end">
                
                <NavItem>
                  
                    Special thanks to Sarasa
                 
                </NavItem>
               
              </Nav>
            </Col>
          </Row>
        </Container>
      </footer>
    );
  }
}

export default SimpleFooter;
