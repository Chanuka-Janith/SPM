const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name:{
        type: String
    },
    email:{
        type: String
    },
    password:{
        type: String
    },
    position:{
        type: String
    }
},{timestamps: true},)

const User = mongoose.model('Authenticate',userSchema)
module.exports = User