import { UNCATEGORIZED_PERSON_ID, usePersons } from "../contexts/PersonsContext"
import PersonCard from "./PersonCard"

export default function UncategorizedPersonCard(props) {
  const { getPersonExpenses } = usePersons()
  const amount = getPersonExpenses(UNCATEGORIZED_PERSON_ID).reduce(
    (total, expense) => total + expense.amount,
    0
  )
  if (amount === 0) return null

  return <PersonCard amount={amount} name="Diğer" gray {...props} />
}


