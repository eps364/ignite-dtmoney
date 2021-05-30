import { Container } from "./styles";
import incomeTmg from "../../assets/income.svg"
import outcomeTmg from "../../assets/outcome.svg"
import totalImg from "../../assets/total.svg"
import { useTransactions } from "../../hooks/useTransactions";

export function Summary() {
  const { transitions } = useTransactions()
  const summary = transitions.reduce((acc, transition) => {
    if (transition.type === 'deposit') {
      acc.deposit += transition.amount
      acc.total += transition.amount
    } else {
      acc.withdraw += transition.amount
      acc.total -= transition.amount
    }
    return acc
  }, {
    deposit: 0,
    withdraw: 0,
    total: 0
  })
  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeTmg} alt="Entradas" />
        </header>
        <strong>{new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(summary.deposit)}</strong>
      </div>

      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeTmg} alt="Saídas" />
        </header>
        <strong>{new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(summary.withdraw)}</strong>
      </div>

      <div className="heightlight-background">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total" />
        </header>
        <strong>{new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(summary.total)}</strong>
      </div>
    </Container>

  )
}