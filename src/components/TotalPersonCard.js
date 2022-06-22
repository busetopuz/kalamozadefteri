import { usePersons } from "../contexts/PersonsContext"
import PersonCard from "./PersonCard"

export default function TotalPersonCard() {
  const { expenses} = usePersons()
  const amount = expenses.reduce((total, expense) => total + expense.amount, 0)
  // const max = persons.reduce((total, person) => total + person.max, 0)
  // if (max === 0) return null

  return <PersonCard amount={amount} name="Toplam Verecek" gray  hideButtons />
}
