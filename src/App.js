import { Button, Stack } from "react-bootstrap"
import Container from "react-bootstrap/Container"
import AddPersonModal from "./components/AddPersonModal"
import AddExpenseModal from "./components/AddExpenseModal"
import SubExpenseModal from "./components/SubExpenseModal"
import ViewExpensesModal from "./components/ViewExpensesModal"
import PersonCard from "./components/PersonCard"
import UncategorizedPersonCard from "./components/UncategorizedPersonCard"
import TotalPersonCard from "./components/TotalPersonCard"
import { useState } from "react"
import { UNCATEGORIZED_PERSON_ID, usePersons } from "./contexts/PersonsContext"
import TotalNegativeCard from "./components/TotalNegativeCard"

function App() {
  const [showAddPersonModal, setShowAddPersonModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [showSubExpenseModal, setShowSubExpenseModal] = useState(false)
  const [viewExpensesModalPersonId, setViewExpensesModalPersonId] = useState()
  const [addExpenseModalPersonId, setAddExpenseModalPersonId] = useState()
  const [subExpenseModalPersonId, setSubExpenseModalPersonId] = useState()
  const { persons, getPersonExpenses } = usePersons()

  function openAddExpenseModal(personId) {
    setShowAddExpenseModal(true)
    setAddExpenseModalPersonId(personId)
  }

  function openSubExpenseModal(personId) {
    setShowSubExpenseModal(true)
    setSubExpenseModalPersonId(personId)
  }

  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4" >
          <h1 className="me-auto">CARİ HESAP KALAMOZA DEFTERİ</h1>
          <Button variant="primary" onClick={() => setShowAddPersonModal(true)}>
            Kişi Ekle
          </Button>
          <Button variant="outline-primary" onClick={openAddExpenseModal}>
            {/* Harcama Ekle */}
            Alacak Ekle
          </Button>
          <Button variant="outline-primary" onClick={openSubExpenseModal}>
            {/* Harcama Çıkar */}
            Verecek Ekle
          </Button>
        </Stack>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
          
          {persons.map(person => {
            const amount = getPersonExpenses(person.id).reduce(
              (total, expense) => total + expense.amount,
              0
            )
            
            
            return (
              <PersonCard
                key={person.id}
                name={person.name}
                vergi={person.vergiNo}
                faxNo={person.faxNo}
                amount={amount}
                adres={person.adres}
                max={person.max}
                onAddExpenseClick={() => openAddExpenseModal(person.id)}
                onSubExpenseClick={() => openSubExpenseModal(person.id)}
                onViewExpensesClick={() =>
                  setViewExpensesModalPersonId(person.id)
                }
              />

              
            )
          })}
          <UncategorizedPersonCard
            onAddExpenseClick={openAddExpenseModal}
            onViewExpensesClick={() =>
              setViewExpensesModalPersonId(UNCATEGORIZED_PERSON_ID)
            }
          />
          <TotalPersonCard />
          <TotalNegativeCard/>
        </div>
      </Container>
      <AddPersonModal
        show={showAddPersonModal}
        handleClose={() => setShowAddPersonModal(false)}
      />
      <AddExpenseModal
        show={showAddExpenseModal}
        defaultPersonId={addExpenseModalPersonId}
        handleClose={() => setShowAddExpenseModal(false)}
      />
         <SubExpenseModal
        show={showSubExpenseModal}
        defaultPersonId={subExpenseModalPersonId}
        handleClose={() => setShowSubExpenseModal(false)}
      />
      <ViewExpensesModal
        personId={viewExpensesModalPersonId}
        handleClose={() => setViewExpensesModalPersonId()}
      />
    </>
  )
}

export default App
