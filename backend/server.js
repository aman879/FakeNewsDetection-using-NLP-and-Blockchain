const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())

app.get('/', (req, res) => {
    res.send('sucess')
})

app.post('/', (req, res) => {
})

app.listen(3000, () => {
    console.log("App is running on port 3000")
})      