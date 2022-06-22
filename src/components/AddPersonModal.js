import { Form, Modal, Button } from "react-bootstrap";
import { useRef } from "react";
import { usePersons } from "../contexts/PersonsContext";

export default function AddPersonModal({ show, handleClose }) {
  const nameRef = useRef();
  const maxRef = useRef();
  const vergiNo = useRef();
  const adres = useRef();
  const tc = useRef();
  const faxNo = useRef();
  const { addPerson } = usePersons();
  function handleSubmit(e) {
    e.preventDefault();
    addPerson({
      name: nameRef.current.value,
      max: parseFloat(maxRef.current.value),
      vergiNo: vergiNo.current.value,
      adres: adres.current.value,
      tc: tc.current.value,
      faxNo: faxNo.current.value,
    });
    handleClose();
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Yeni Kişi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Firma/Kişi Adı</Form.Label>
            <Form.Control ref={nameRef} type="text" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Vergi Numarası</Form.Label>
            <Form.Control ref={vergiNo} type="number" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Adres</Form.Label>
            <Form.Control ref={adres} type="text" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Tc Numarası</Form.Label>
            <Form.Control ref={tc} type="number"  />
          </Form.Group>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Fax Numarası</Form.Label>
            <Form.Control ref={faxNo} type="number" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="max">
            <Form.Label>Telefon Numarası</Form.Label>
            <Form.Control
              ref={maxRef}
              type="number"
              required
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Ekle
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}
