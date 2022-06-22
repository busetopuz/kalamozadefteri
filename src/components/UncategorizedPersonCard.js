import { UNCATEGORIZED_PERSON_ID, usePersons } from "../contexts/PersonsContext"
import PersonCard from "./PersonCard"

export default function UncategorizedPersonCard(props) {
  const { getPersonExpenses, getPersonSubExpenses } = usePersons()
  const amount1 = getPersonExpenses(UNCATEGORIZED_PERSON_ID).reduce(
    (total, expense) => total + expense.amount,
    0
  )
  const amount2= getPersonSubExpenses(UNCATEGORIZED_PERSON_ID).reduce(
    (total, expense) => total + expense.amount,
    0
  )
  
  if (amount1 + amount2 === 0) return null

  return <PersonCard amount={amount1 + amount2} name="Diğer" gray {...props} />
}


