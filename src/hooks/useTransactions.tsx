import { createContext, useEffect, useState, ReactNode, useContext } from 'react'
import { api } from '../services/api';

interface Transition {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

type TransitionInput = Omit<Transition, 'id' | 'createdAt'>

interface TransitionsProviderProps {
  children: ReactNode
}

interface TransactionsContextData {
  transitions: Transition[];
  createTransaction: (transition: TransitionInput) => Promise<void>
}

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData)

export function TransactionProvider({ children }: TransitionsProviderProps) {
  const [transitions, setTransitions] = useState<Transition[]>([]);
  useEffect(() => {
    api.get('transitions')
      .then(response => setTransitions(response.data.transitions))
  }, [])

  async function createTransaction(TransactionInput: TransitionInput) {
    const response = await api.post('/transitions', {
      ...TransactionInput,
      createdAt: new Date()
    })
    const { transition } = response.data
    setTransitions([...transitions, transition])
  }

  return (
    <TransactionsContext.Provider value={{ transitions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionsContext)
  return context
}