const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const app = express()
app.use(cors())
app.use(express.json())

const dbPath = path.join(__dirname, 'db.json')
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'))

app.get('/customers', (req, res) => {
  res.json(db.customers)
})

app.get('/customers/:id', (req, res) => {
  const { id } = req.params
  const customer = customers.find((c) => c.customerId === id)
  if (!customer) {
    return res.status(404).json({ error: 'Cliente no encontrado' })
  }
  const customerProducts = products.filter((p) => p.customerId === id)
  const customerWithProducts = {
    ...customer,
    products: customerProducts,
  }

  res.json(customerWithProducts)
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`)
})
