import calculateBmi from './bmiCalculator'
import express from 'express'

const app = express()

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height) / 100
    const weight = Number(req.query.weight)
    res.json({
        height, weight,
        bmi: calculateBmi(height, weight)
    })
})

app.listen(3002)