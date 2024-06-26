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

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleUsernameChange = (e) => {
    const { value } = e.target;
    setUsername(value);
    setUsernameError("");
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);
    setEmailError("");
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);
    setPasswordError("");
    setConfirmPasswordError("");
  };

  const handleConfirmPasswordChange = (e) => {
    const { value } = e.target;
    setConfirmPassword(value);
    setConfirmPasswordError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!username || !validateEmail(email) || !password || password !== confirmPassword) {
      if (!username) {
        setUsernameError("Por favor, ingrese un nombre de usuario.");
      }
      if (!validateEmail(email)) {
        setEmailError("Por favor, ingrese un correo electrónico válido.");
      }
      if (!password) {
        setPasswordError("Por favor, ingrese una contraseña.");
      }
      if (password !== confirmPassword) {
        setConfirmPasswordError("Las contraseñas no coinciden.");
      }
      return;
    }

    // Start loading
    setIsLoading(true);

    try {
      // Check if username or email already exists
      const checkResponse = await fetch("http://localhost:5000/api/users/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email }),
      });

      const checkData = await checkResponse.json();

      if (!checkResponse.ok) {
        if (checkData.errors) {
          if (checkData.errors.email) {
            setEmailError(checkData.errors.email);
          }
          if (checkData.errors.username) {
            setUsernameError(checkData.errors.username);
          }
        }
        setIsLoading(false);
        return;
      }

      // Proceed with registration if no existing user found
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const responseData = await response.json();

      if (response.ok) {
        setRegistrationSuccess(true);
        setIsLoading(false);
        // Reset form fields
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        // Hide confirmation message after 3 seconds
        setTimeout(() => {
          setRegistrationSuccess(false);
          // Redirect to login page after 2 seconds
          setTimeout(() => {
            window.location.href = "/login";
          }, 0);
        }, 1000);
      } else {
        // Handle specific error messages from the backend
        if (responseData.errors) {
          responseData.errors.forEach((error) => {
            if (error.param === "username") {
              setUsernameError(error.msg);
            } else if (error.param === "email") {
              setEmailError(error.msg);
            } else if (error.param === "password") {
              setPasswordError(error.msg);
            }
          });
        }
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setIsLoading(false);
    }
  };

  const validateEmail = (email) => {
    // Email regex pattern
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
                      <big>Regístrate con tu email. ¡Es gratis!</big>
                    </div>
                    <Form role="form" onSubmit={handleSubmit}>
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-badge" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Usuario"
                            type="text"
                            value={username}
                            onChange={handleUsernameChange}
                          />
                        </InputGroup>
                        {usernameError && (
                          <small className="text-danger">{usernameError}</small>
                        )}
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
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
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-lock-circle-open" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Contraseña"
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                          />
                        </InputGroup>
                        {passwordError && (
                          <small className="text-danger">{passwordError}</small>
                        )}
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-lock-circle-open" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Confirmar contraseña"
                            type="password"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                          />
                        </InputGroup>
                        {confirmPasswordError && (
                          <small className="text-danger">{confirmPasswordError}</small>
                        )}
                      </FormGroup>
                      {registrationSuccess && (
                        <div className="alert alert-success mb-3" role="alert">
                          Registro exitoso. Redirigiendo a iniciar sesión...
                        </div>
                      )}
                      <div className="text-center">
                        <Button
                          className="mt-4"
                          color="primary"
                          type="submit"
                          disabled={
                            !!usernameError ||
                            !!emailError ||
                            !!passwordError ||
                            !!confirmPasswordError ||
                            isLoading
                          }
                        >
                          {isLoading ? (
                            <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                          ) : null}
                          Crear cuenta
                        </Button>
                      </div>
                      <br />
                      <div className="text-center">
                        <p>
                          ¿Ya tienes cuenta? <br />
                          <b>
                            <a href="/login" className="text-primary">Inicia sesión</a>
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
    </>
  );
};

export default Register;
