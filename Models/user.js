let mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
    email : {
        type: String,
        unique: [true, 'Please enter a valid email'],
        required: [true, 'Email is required'],
    },
    password : {
        type: String,
        required: [true, 'Password is required'],
    }
})
let User = mongoose.model('User', userSchema);
module.exports = User;
