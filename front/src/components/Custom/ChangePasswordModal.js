import React, { useState, useEffect } from "react";
import { Modal, Card, CardHeader, CardBody, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Button, Form, Label } from "reactstrap";

const ChangePasswordModal = ({ isOpen, toggle }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [confirmationMessage, setConfirmationMessage] = useState("");

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
    const value = e.target.value;
    if (/^[a-zA-Z0-9!@#$%^&*_+=]*$/.test(value)) {
      setOldPassword(value);
    }
  };

  const handleNewPasswordChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z0-9!@#$%^&*_+=]*$/.test(value)) {
      setNewPassword(value);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z0-9!@#$%^&*_+=]*$/.test(value)) {
      setConfirmPassword(value);
    }
  };

  const handlePasswordChange = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      setValidationErrors({
        oldPassword: !oldPassword ? "La contraseña actual es requerida." : "",
        newPassword: !newPassword ? "La nueva contraseña es requerida." : "",
        confirmPassword: !confirmPassword ? "La confirmación de contraseña es requerida." : "",
      });
      return;
    }

    if (!/^[a-zA-Z0-9!@#$%^&*_+=]*$/.test(oldPassword)) {
      setValidationErrors({
        oldPassword: "La contraseña actual debe contener solo letras, números o los siguientes símbolos: !@#$%^&*_+=",
      });
      return;
    }

    if (!/^[a-zA-Z0-9!@#$%^&*_+=]*$/.test(newPassword)) {
      setValidationErrors({
        newPassword: "La nueva contraseña debe contener solo letras, números o los siguientes símbolos: !@#$%^&*_+=",
      });
      return;
    }

    if (!/^[a-zA-Z0-9!@#$%^&*_+=]*$/.test(confirmPassword)) {
      setValidationErrors({
        confirmPassword: "La confirmación de contraseña debe contener solo letras, números o los siguientes símbolos: !@#$%^&*_+=",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      setValidationErrors({
        confirmPassword: "Las contraseñas no coinciden.",
      });
      return;
    }

    // Password change logic here
    setConfirmationMessage("Contraseña cambiada exitosamente");
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
