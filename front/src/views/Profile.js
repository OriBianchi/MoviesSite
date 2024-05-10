import React, { useState, useEffect } from "react";
import { Button, Card, Container, Row, Col } from "reactstrap";
import NavBar_LoggedIn from "components/Navbars/NavBar_LoggedIn.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import profileimg1 from "../assets/img/icons/profileicons/1.png";
import profileimg2 from "../assets/img/icons/profileicons/2.png";
import profileimg3 from "../assets/img/icons/profileicons/3.png";
import profileimg4 from "../assets/img/icons/profileicons/4.png";
import ChangePasswordModal from "../components/Custom/ChangePasswordModal.js";

const Profile = () => {
  const profileImages = [profileimg1, profileimg2, profileimg3, profileimg4];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);

  useEffect(() => {
    // Retrieve the selected image index from localStorage
    const storedIndex = localStorage.getItem("selectedProfileImageIndex");
    if (storedIndex !== null) {
      setCurrentImageIndex(parseInt(storedIndex));
    }
  }, []);

  const toggleChangePasswordModal = () => {
    setIsChangePasswordModalOpen((prevState) => !prevState);
  };

  const handleClickProfileImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === profileImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    // Save the selected image index to localStorage whenever it changes
    localStorage.setItem("selectedProfileImageIndex", currentImageIndex);
  }, [currentImageIndex]);

  const handlePasswordChange = () => {
    // Password change logic here
    console.log("Password changed successfully!");
    // Close the modal
    toggleChangePasswordModal();
  };

  return (
    <>
      <NavBar_LoggedIn />
      <main className="profile-page">
        <section className="section-profile-cover section-shaped my-0">
          <div className="shape shape-style-1 shape-default alpha-4">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="separator separator-bottom separator-skew">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="fill-white"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>
        </section>
        <section className="section">
          <Container>
            <Card className="card-profile shadow mt--300">
              <div className="px-4">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={handleClickProfileImage}>
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={profileImages[currentImageIndex]}
                        />
                      </a>
                    </div>
                  </Col>
                  <br />
                  <br />
                  <br />
                  <br />
                </Row>
                <div className="text-center mt-5">
                  <h3>Juanjo24</h3>
                  <div className="h6 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    Miembr@ de Cinefilia desde el 10 de mayo de 2024
                  </div>
                  <Col>
                    <br />
                    <Button
                      className="float-center"
                      color="warning"
                      href="#pablo"
                      onClick={toggleChangePasswordModal}
                      size="sm"
                    >
                      CAMBIAR MI CONTRASEÑA
                    </Button>
                  </Col>
                  <Row className="justify-content-center">
                    <Col className="order-lg-1" lg="4">
                      <div className="card-profile-stats d-flex justify-content-center">
                        <div>
                          <span className="heading">22</span>
                          <span className="description">Me gusta</span>
                        </div>
                        <div>
                          <span className="heading">10</span>
                          <span className="description">Guardadas</span>
                        </div>
                        <div>
                          <span className="heading">89</span>
                          <span className="description">Vistas</span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="mt-5 py-5 border-top text-center"></div>
              </div>
            </Card>
          </Container>
        </section>
      </main>
      <SimpleFooter />

      {/* Change Password Modal */}
      <ChangePasswordModal isOpen={isChangePasswordModalOpen} toggle={toggleChangePasswordModal} onPasswordChange={handlePasswordChange} />
    </>
  );
};

export default Profile;
