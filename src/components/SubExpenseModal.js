import { Form, Modal, Button } from "react-bootstrap"
import { useRef } from "react"
import { usePersons, UNCATEGORIZED_PERSON_ID } from "../contexts/PersonsContext"

export default function SubExpenseModal({
  show,
  handleClose,
  defaultPersonId,
}) {
  const descriptionRef = useRef()
  const amountRef = useRef()
  const personIdRef = useRef()
  const { subExpense, persons } = usePersons()

  function handleSubmit(e) {
    e.preventDefault()
    subExpense({
      description: descriptionRef.current.value,
      amount: parseFloat(amountRef.current.value)*-1,
      personId: personIdRef.current.value,
    })
    handleClose()
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Açıklama</Form.Label>
            <Form.Control ref={descriptionRef} type="text" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="amount">
            <Form.Label>Miktar</Form.Label>
            <Form.Control
              ref={amountRef}
              type="number"
              required
              min={0}
              step={0.1}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="personId">
            <Form.Label>Kişi</Form.Label>
            <Form.Select defaultValue={defaultPersonId} ref={personIdRef}>
              <option id={UNCATEGORIZED_PERSON_ID}>Diğer</option>
              {persons.map(person => (
                <option key={person.id} value={person.id}>
                  {person.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Ekle
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  )
}
