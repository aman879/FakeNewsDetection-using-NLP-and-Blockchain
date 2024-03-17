const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('sucess')
})

app.post('/predict', async (req, res) => {
    try {
        const inputData = req.body
        const response = await axios.post('http://127.0.0.1:5000/predict', inputData)
        console.log(response.data)
        
        res.json(response.data)
    } catch (error) {
        console.error('Error:', error)
        res.status(500).send('Internal Server Error')
    }
})

app.listen(3000, () => {
    console.log("App is running on port 3000")
})      