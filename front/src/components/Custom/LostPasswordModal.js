import React, { useState, useEffect } from "react";
import { Modal, Card, CardHeader, CardBody, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Button, Form, Label } from "reactstrap";

const LostPasswordModal = ({ isOpen, toggle }) => {
  const [email, setEmail] = useState("");
  const [validationError, setValidationError] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");

  useEffect(() => {
    if (!isOpen) {
      clearFields();
    }
  }, [isOpen]);

  const clearFields = () => {
    setEmail("");
    setValidationError("");
    setConfirmationMessage("");
  };

  useEffect(() => {
    let timer;
    if (confirmationMessage) {
      timer = setTimeout(() => {
        toggle();
        clearFields();
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [confirmationMessage, toggle]);

  const validateEmail = (email) => {
    // Email regex pattern
    const emailPattern = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return emailPattern.test(email);
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);
    if (!validateEmail(value)) {
      setValidationError("Por favor, ingrese un correo electrónico válido.");
    } else {
      setValidationError("");
    }
  };

  const handleKeyPress = (e) => {
    const { key } = e;
    const authorizedCharacters = /^[a-zA-Z0-9@_.]+$/;
    if (!authorizedCharacters.test(key)) {
      e.preventDefault();
    }
  };

  const handleResetPassword = () => {
    if (!email) {
      setValidationError("Por favor, ingrese su correo electrónico.");
      return;
    }

    if (!validateEmail(email)) {
      setValidationError("Por favor, ingrese un correo electrónico válido.");
      return;
    }

    // Reset password logic here
    setConfirmationMessage("Se ha enviado una nueva contraseña a tu correo electrónico.");
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="sm" className="modal-dialog-centered" style={{ maxWidth: '500px' }}>
      <Card className="d-flex flex-column h-1 w-100">
        <CardHeader className="bg-white pb-5 w-100">
          <div className="d-flex justify-content-between align-items-center">
            <div className="text-muted">
              <small>Restablecer contraseña</small>
            </div>
            <button type="button" className="close" aria-label="Close" onClick={toggle}>
              <span aria-hidden="true">&times;</span>
            </button>
            
          </div>
        </CardHeader>
        <CardBody className="px-lg-10 py-lg-3 w-100" style={{ maxWidth: '400px', margin: '0 auto' }}>
          <Form role="form">
            <FormGroup>
              <Label for="email">Correo Electrónico</Label>
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-email-83" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  id="email"
                  placeholder="Correo Electrónico"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  onKeyPress={handleKeyPress}
                />
              </InputGroup>
              {validationError && (
                <small className="text-danger">{validationError}</small>
              )}
            </FormGroup>
            {confirmationMessage && (
              <div className="alert alert-success mb-3" role="alert">
                {confirmationMessage}
              </div>
            )}
            <div className="text-center">
              <Button color="primary" onClick={handleResetPassword}>Restablecer Contraseña</Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </Modal>
  );
};

export default LostPasswordModal;
