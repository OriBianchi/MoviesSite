// ChangePasswordModal.js
import React, { useState, useEffect } from "react";
import { Modal, Card, CardHeader, CardBody, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Button, Form, Label } from "reactstrap";

const ChangePasswordModal = ({ isOpen, toggle, onPasswordChange }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const validatePassword = (password) => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!#$%&/*+.])[A-Za-z\d!#$%&/*+.]{7,}$/;
    return passwordPattern.test(password);
  };

  useEffect(() => {
    if (!isOpen) {
      clearFields();
    }
  }, [isOpen]);

  const clearFields = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setValidationErrors({});
    setConfirmationMessage("");
  };

  useEffect(() => {
    let timer;
    if (confirmationMessage) {
      timer = setTimeout(() => {
        toggle();
        clearFields();
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [confirmationMessage, toggle]);

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handlePasswordChange = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      setValidationErrors({
        oldPassword: !oldPassword ? "La contraseña actual es requerida." : "",
        newPassword: !newPassword ? "La nueva contraseña es requerida." : "",
        confirmPassword: !confirmPassword ? "La confirmación de contraseña es requerida." : "",
      });
      return;
    }

    if (!validatePassword(newPassword)) {
      setValidationErrors({
        newPassword: "La contraseña debe tener al menos 7 caracteres, incluyendo al menos una letra minúscula, una letra mayúscula, un número y un símbolo entre !#$%&/*+.",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      setValidationErrors({
        confirmPassword: "Las contraseñas no coinciden.",
      });
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setConfirmationMessage("Contraseña cambiada exitosamente");
        onPasswordChange();
      } else {
        setValidationErrors({ oldPassword: data.message });
      }
    } catch (error) {
      console.error("Error changing password", error);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="sm" className="modal-dialog-centered" style={{ maxWidth: '500px' }}>
      <Card className="d-flex flex-column h-100 w-100">
        <CardHeader className="bg-white pb-5 w-100">
          <div className="d-flex justify-content-between align-items-center">
            <div className="text-muted">
              <small>Cambiar contraseña</small>
            </div>
            <button type="button" className="close" aria-label="Close" onClick={toggle}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </CardHeader>
        <CardBody className="px-lg-10 py-lg-10 w-100" style={{ maxWidth: '400px', margin: '0 auto' }}>
          <Form role="form">
            <FormGroup>
              <Label for="oldPassword">Contraseña actual</Label>
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-lock-circle-open" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  id="oldPassword"
                  placeholder="Contraseña actual"
                  type="password"
                  value={oldPassword}
                  onChange={handleOldPasswordChange}
                />
              </InputGroup>
              {validationErrors.oldPassword && (
                <small className="text-danger">{validationErrors.oldPassword}</small>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="newPassword">Nueva contraseña</Label>
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-lock-circle-open" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  id="newPassword"
                  placeholder="Nueva contraseña"
                  type="password"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                />
              </InputGroup>
              {validationErrors.newPassword && (
                <small className="text-danger">{validationErrors.newPassword}</small>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="confirmPassword">Confirmar nueva contraseña</Label>
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-lock-circle-open" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  id="confirmPassword"
                  placeholder="Confirmar nueva contraseña"
                  type="password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
              </InputGroup>
              {validationErrors.confirmPassword && (
                <small className="text-danger">{validationErrors.confirmPassword}</small>
              )}
            </FormGroup>
            {confirmationMessage && (
              <div className="alert alert-success mb-3" role="alert">
                {confirmationMessage}
              </div>
            )}
            <div className="text-center">
              <Button color="primary" onClick={handlePasswordChange}>Cambiar contraseña</Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </Modal>
  );
};

export default ChangePasswordModal;
