import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";
import NavBar_LoggedOut from "components/Navbars/NavBar_LoggedOut.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import LostPasswordModal from "components/Custom/LostPasswordModal";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLostPasswordModalOpen, setIsLostPasswordModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const toggleLostPasswordModal = () => {
    setIsLostPasswordModalOpen(!isLostPasswordModalOpen);
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);
    if (!validateEmail(value)) {
      setEmailError("Por favor, ingrese un correo electrónico válido.");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);
    if (!value) {
      setPasswordError("Por favor, ingrese su contraseña.");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email) || !password) {
      if (!validateEmail(email)) {
        setEmailError("Por favor, ingrese un correo electrónico válido.");
      }
      if (!password) {
        setPasswordError("Por favor, ingrese su contraseña.");
      }
      return;
    }

    setIsLoading(true);
    setLoginError("");

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save token to local storage
        localStorage.setItem('token', data.token);

        // Optionally, redirect to the main page after successful login
        setTimeout(() => {
          window.location.href = "/main-page";
        }, 1000);
      } else {
        setLoginError(data.message || "Error al iniciar sesión. Por favor, inténtelo de nuevo.");
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error during login:", error);
      setLoginError("Error al iniciar sesión. Por favor, inténtelo de nuevo.");
      setIsLoading(false);
    }
  };

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  return (
    <>
      <NavBar_LoggedOut />
      <main>
        <section className="section section-shaped section-lg">
          <div className="shape shape-style-1 bg-gradient-default">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <Container className="pt-lg-7">
            <Row className="justify-content-center">
              <Col lg="5">
                <Card className="bg-secondary shadow border-0">
                  <CardBody className="px-lg-5 py-lg-5">
                    <div className="text-center text-muted mb-4">
                      <big>¡Inicia sesión!</big>
                    </div>
                    <Form role="form" onSubmit={handleSubmit}>
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-email-83" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Correo"
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                          />
                        </InputGroup>
                        {emailError && (
                          <small className="text-danger">{emailError}</small>
                        )}
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-lock-circle-open" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Contraseña"
                            type="password"
                            autoComplete="off"
                            value={password}
                            onChange={handlePasswordChange}
                          />
                        </InputGroup>
                        {passwordError && (
                          <small className="text-danger">{passwordError}</small>
                        )}
                      </FormGroup>
                      <div className="text-muted font-italic">
                        <small>
                          <a href="#" className="text-primary" onClick={toggleLostPasswordModal}>
                            ¿Olvidaste tu contraseña?
                          </a>
                        </small>
                      </div>
                      {loginError && (
                        <div className="text-center text-danger mb-3">
                          {loginError}
                        </div>
                      )}
                      <div className="text-center">
                        <Button
                          className="my-4"
                          color="primary"
                          type="submit"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                          ) : null}
                          Ingresar
                        </Button>
                      </div>
                      <div className="text-center">
                        <p>
                          ¿Nuevo en Cinefilia? <br />{" "}
                          <b>
                            <a href="/register" className="text-primary">Crea tu cuenta</a>
                          </b>
                        </p>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
      <SimpleFooter />
      {isLostPasswordModalOpen && (
        <LostPasswordModal
          isOpen={isLostPasswordModalOpen}
          toggle={toggleLostPasswordModal}
        />
      )}
    </>
  );
};

export default Login;
