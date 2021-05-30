import { useTransactions } from "../../hooks/useTransactions";
import { Container } from "./styles";

export function TransitionsTable() {
  const { transitions } = useTransactions()
  return (
    <Container>
      <table>

        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {transitions.map(transition => (
            <tr key={transition.id}>
              <td>{transition.title}</td>
              <td className={transition.type}>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(transition.amount)}
              </td>
              <td>{transition.category}</td>
              <td> {new Intl.DateTimeFormat('pt-BR').format(
                new Date(transition.createdAt)
              )}</td>
            </tr>
          ))}


        </tbody>

      </table>

    </Container>
  )
}