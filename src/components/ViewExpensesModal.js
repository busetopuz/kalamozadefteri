import { Modal, Button, Stack } from "react-bootstrap"
import { UNCATEGORIZED_PERSON_ID, usePersons } from "../contexts/PersonsContext"
import { currencyFormatter } from "../utils"

export default function ViewExpensesModal({ personId, handleClose }) {
  const { getPersonExpenses, persons, deletePerson, deleteExpense, deleteSubExpense, getPersonSubExpenses } =
    usePersons()

  const expenses = getPersonExpenses(personId)
  const denemeler = getPersonSubExpenses(personId)
  const person =
    UNCATEGORIZED_PERSON_ID === personId
      ? { name: "Diğer", id: UNCATEGORIZED_PERSON_ID }
      : persons.find(b => b.id === personId)

  return (
    <Modal show={personId != null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap="2">

            <div style={{flexdirection:"column"}}> 
            
            <label> Vergi No:  {person?.vergiNo} </label>
            <div>Kişi : {person?.name} </div>
            <label> Harcama Geçmişi</label>
            </div>
            
           
            {personId !== UNCATEGORIZED_PERSON_ID && (
              <Button 
                onClick={() => {
                  deletePerson(person)
                  handleClose()
                }}
                variant="outline-danger"
              >
                Kişiyi Sil
              </Button>
            )}
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="vertical" gap="3">
          {expenses.map(expense => (
            <Stack direction="horizontal" gap="2" key={expense.id}>
              <div className="me-auto fs-4">{expense.description}</div>
              <div className="fs-5">
                {currencyFormatter.format(expense.amount)}
              </div>
              <Button
                onClick={() => deleteExpense(expense)}
                size="sm"
                variant="outline-danger"
              >
                &times;
              </Button>
            </Stack>
          ))}
        </Stack>
        <Stack direction="vertical" gap="3">
          {denemeler.map(denemeler => (
            <Stack direction="horizontal" gap="2" key={denemeler.id}>
              <div className="me-auto fs-4">{denemeler.description}</div>
              <div className="fs-5">
                {currencyFormatter.format(denemeler.amount)}
              </div>
              <Button
                onClick={() => deleteSubExpense(denemeler)}
                size="sm"
                variant="outline-danger"
              >
                &times;
              </Button>
            </Stack>
          ))}
        </Stack>
      </Modal.Body>
    </Modal>
  )
}
