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

app.get('/products', (req, res) => {
  res.json(db.products)
})

app.get('/customers/:id', (req, res) => {
  const customerId = req.params.id
  const customer = db.customers.find((c) => c.customerId === customerId)

  if (!customer) {
    return res.status(404).json({ message: 'Customer not found' })
  }

  const associatedProducts = db.products.filter(
    (p) => p.customerId === customerId
  )

  res.json({
    ...customer,
    products: associatedProducts,
  })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`)
})
