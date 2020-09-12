import express from 'express'

const app = express()

app.get('/hello', (_, res) => {
    res.send('Hallo, Welt!')
})

app.listen()