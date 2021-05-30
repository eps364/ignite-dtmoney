import { Container } from "./styles";
import incomeTmg from "../../assets/income.svg"
import outcomeTmg from "../../assets/outcome.svg"
import totalImg from "../../assets/total.svg"
import { useContext } from "react";
import { TransactionsContext } from "../../context/TransactionsContext";

export function Summary() {
  const { transitions } = useContext(TransactionsContext)
  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeTmg} alt="Entradas" />
        </header>
        <strong>R$ 1.000,00</strong>
      </div>

      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeTmg} alt="Saídas" />
        </header>
        <strong>- R$ 500,00</strong>
      </div>

      <div className="heightlight-background">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total" />
        </header>
        <strong>- R$ 500,00</strong>
      </div>
    </Container>

  )
}