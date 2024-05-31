require('dotenv').config()
const express= require('express')
const {mongoose} = require('mongoose')
const auth = require('./routes/auth')
const quiz = require('./routes/quiz')
const cors= require('cors')
const app=express()

app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log('MongoDB is Connected')
}).catch((error)=>{
    console.log("error")
})

const PORT = process.env.PORT || 4000
const HOST = process.env.HOST || 'localhost'

app.use('/api/auth',auth)
app.use('/api/quiz',quiz)
app.get('/',(req,res)=>{
    res.json({"message":"hello world"})
})
app.listen(PORT,()=>{
    console.log(`Example app listening on port http://${HOST}:${PORT}`)
})