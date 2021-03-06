import { Button, Card, Stack } from "react-bootstrap"
import { currencyFormatter } from "../utils"

export default function PersonCard({
  name,
  amount,
  hideButtons,
  onAddExpenseClick,
  onSubExpenseClick,
  onViewExpensesClick,
}) {
  const classNames = []
  // if (amount > max) {
  //   classNames.push("bg-danger", "bg-opacity-10")
  // } else if (gray) {
  //   classNames.push("bg-light")
  // }

  return (
    <Card className={classNames.join(" ")}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
          <div className="me-2">{name}</div>
        

          <div className="d-flex align-items-baseline">
            {currencyFormatter.format(amount)}

          </div>
        </Card.Title>
  
        {!hideButtons && (
          <Stack direction="horizontal" gap="2" className="mt-4">
            <Button
              variant="outline-primary"
              className="ms-auto"
              onClick={onAddExpenseClick}
            >
              {/* Ödeme Ekle */}
              Alacak Ekle
            </Button>
            <Button
              variant="outline-primary"
              className="ms-auto"
              onClick={onSubExpenseClick}
            >
              {/* Borç Ekle */}
              Verecek Ekle
            </Button>
            <Button onClick={onViewExpensesClick} variant="outline-secondary">
              Harcamaları Gör
            </Button>
          </Stack>
        )}
      </Card.Body>
    </Card>
  )
}
