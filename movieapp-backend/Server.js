const express = require('express')
const app = express()
const dotenv = require('dotenv')
const ConnectToDB = require('./Config/db')
const AuthRouter = require('./Routes/AuthRoute')
const cors = require('cors')
const MovieRouter = require('./Routes/MovieRoute')

dotenv.config()


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: 'http://192.168.1.103:8081',
    credentials: true
}))
ConnectToDB()


app.use('/auth', AuthRouter)
app.use('/Movies', MovieRouter)

app.listen(3000, (req,res)=>{
    console.log("App Is Listening To Server")
})