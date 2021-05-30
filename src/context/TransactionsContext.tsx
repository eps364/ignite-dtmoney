import { createContext, useEffect, useState, ReactNode } from 'react'
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
  createTransaction: (transition: TransitionInput) => void
}

export const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData)

export function TransactionProvider({ children }: TransitionsProviderProps) {
  const [transitions, setTransitions] = useState<Transition[]>([]);
  useEffect(() => {
    api.get('transitions')
      .then(response => setTransitions(response.data.transitions))
  }, [])

  function createTransaction(transaction: TransitionInput) {
    api.post('/transitions', transaction)
  }

  return (
    <TransactionsContext.Provider value={{ transitions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )
}