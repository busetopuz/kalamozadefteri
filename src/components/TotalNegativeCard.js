import { usePersons } from "../contexts/PersonsContext"
import PersonCard from "./PersonCard"

export default function TotalNegativeCard() {
  const { denemeler} = usePersons()
  const amount = denemeler.reduce((total, expense) => total + expense.amount, 0)
  // const max = persons.reduce((total, person) => total + person.max, 0)
  // if (max === 0) return null

  return <PersonCard amount={amount} name="Toplam Alacak" gray  hideButtons />
}