import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs'
import { App } from './App';
createServer({
  models: {
    transition: Model
  },
  seeds(server) {
    server.db.loadData({
      transitions: [{
        id: 1,
        title: 'Freelance de website',
        type: 'deposit',
        category: 'Dev',
        amount: 6000.35,
        createdAt: new Date()
      }, {
        id: 2,
        title: 'Aluguel',
        type: 'withdraw',
        category: 'Casa',
        amount: 600,
        createdAt: new Date()
      }]
    })
  },
  routes() {
    this.namespace = 'api'

    this.get('/transitions', () => {
      return this.schema.all('transition')
    })

    this.post('/transitions', (schema, request) => {
      const data = JSON.parse(request.requestBody)
      return schema.create('transition', data)
    })

  }
})
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);