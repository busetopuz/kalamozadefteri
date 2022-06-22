import React, { useContext } from "react"
import { v4 as uuidV4 } from "uuid"
import useLocalStorage from "../hooks/useLocalStorage"

const PersonsContext = React.createContext()

export const UNCATEGORIZED_PERSON_ID = "Diğer"

export function usePersons() {
  return useContext(PersonsContext)
}

export const PersonsProvider = ({ children }) => {
  const [persons, setPersons] = useLocalStorage("persons", [])
  const [expenses, setExpenses] = useLocalStorage("expenses", [])
  const [denemeler, setDenemeler] = useLocalStorage("denemeler", [])

  function getPersonExpenses(personId) {
    return expenses.filter(expense => expense.personId === personId)
  }
  function addExpense({ description, amount, personId }) {
    setExpenses(prevExpenses => {
      return [...prevExpenses, { id: uuidV4(), description, amount, personId }]
    })
  }
  function subExpense({ description, amount, personId }) {
    setDenemeler(prevDenemeler => {
      return [...prevDenemeler, { id: uuidV4(), description, amount, personId }]
    })
  }
  function deleteSubExpense({ id }) {
    setDenemeler(prevDenemeler => {
      return prevDenemeler.filter(denemeler => denemeler.id !== id)
    })
  }
  function getPersonSubExpenses(personId) {
    return denemeler.filter(denemeler => denemeler.personId === personId)
  }
  function addPerson({ name, max ,vergiNo,adres,tc,faxNo}) {
    setPersons(prevPersons => {
      if (prevPersons.find(person => person.name === name)) {
        return prevPersons
      }
      return [...prevPersons, { id: uuidV4(), name, max ,vergiNo,adres,tc,faxNo}]
    })
  }
  function deletePerson({ id }) {
    setExpenses(prevExpenses => {
      return prevExpenses.map(expense => {
        if (expense.personId !== id) return expense
        return { ...expense, personId: UNCATEGORIZED_PERSON_ID }
      })
    })

    setPersons(prevPersons => {
      return prevPersons.filter(person => person.id !== id)
    })
  }
  function deleteExpense({ id }) {
    setExpenses(prevExpenses => {
      return prevExpenses.filter(expense => expense.id !== id)
    })
  }

  return (
    <PersonsContext.Provider
      value={{
        persons,
        expenses,
        denemeler,
        getPersonExpenses,
        addExpense,
        addPerson,
        subExpense,
        deletePerson,
        deleteExpense,
        deleteSubExpense,
        getPersonSubExpenses
      }}
    >
      {children}
    </PersonsContext.Provider>
  )
}
