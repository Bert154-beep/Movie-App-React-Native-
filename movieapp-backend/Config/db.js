const mongoose = require('mongoose')

function ConnectToDB(){
    mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("Connected To DB")
    })
}

module.exports = ConnectToDB;