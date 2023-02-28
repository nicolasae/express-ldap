const express = require('express')
const cors = require('cors')
const router = require('./routes/userRoutes')

const app = express()

const corOptions = {
    origin: 'https://localhost:3000'
}

// middleware
app.use(cors(corOptions))

app.use(express.json())

app.use( express.urlencoded({ extended: true }))

// routers
app.use('/api/users', router)

// port
const PORT = process.env.PORT || 8080

// server
app.listen(PORT, () => {
    console.log(`server is running port ${PORT}`)
})