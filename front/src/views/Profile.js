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
  const [userData, setUserData] = useState({});
  const [likedCount, setLikedCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);
  const [seenCount, setSeenCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Retrieve the selected image index from localStorage
    const storedIndex = localStorage.getItem("selectedProfileImageIndex");
    if (storedIndex !== null) {
      setCurrentImageIndex(parseInt(storedIndex));
    }
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/auth/user", {
          headers: {
            "x-auth-token": token,
          },
        });
        console.log(token);
        const data = await response.json();
        if (response.ok) {
          setUserData(data);
          // Update counts
          setLikedCount(data.likedMovies.length);
          setSavedCount(data.savedMovies.length);
          setSeenCount(data.seenMovies.length);
        } else {
          console.error("Failed to fetch user data", data.message);
        }
      } catch (error) {
        console.error("Error fetching user data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
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

  if (loading) {
    return <div>Loading...</div>;
  }

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
                  <h3>{userData.username}</h3>
                  <div className="h6 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    Miembr@ de Cinefilia desde {new Date(userData.creationDate).toLocaleDateString()}
                  </div>
                  <div className="h6 font-weight-300">
                    <i className="ni email-83 mr-2" />
                    {userData.email}
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
                          <span className="heading">{likedCount}</span>
                          <span className="description">Me gusta</span>
                        </div>
                        <div>
                          <span className="heading">{savedCount}</span>
                          <span className="description">Guardadas</span>
                        </div>
                        <div>
                          <span className="heading">{seenCount}</span>
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