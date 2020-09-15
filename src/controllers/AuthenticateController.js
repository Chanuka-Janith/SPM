const User = require('../models/Authenticate')
const bcrypt = require('bcryptjs')
const jesontoken = require('jsonwebtoken')


const register = (req, res , next) => {
    bcrypt.hash(req.body.password, 10, function(err, hashedPass) {
        if(err){
            res.json({
                error: err
            })
        }
        let user = new User ({
            name: req.body.name,
            email: req.body.email,
            position: req.body.position,
            password: hashedPass
        })
        user.save().then(user =>{
            res.json({
                message:'User Added Sucessfully'
            })
        })
            .catch(error => {
                res.json({
                    message: 'An Error'
                })
            })
    })


}
const login = (req, res , next) => {
    var username = req.body.username
    var password = req.body.password

    User.findOne({$or: [{email:username},{position:username}]})
        .then(user => {
            if(user){
                bcrypt.compare(password, user.password, function(err, result){
                    if (err){
                        res.json({
                            error: err
                        })
                    }
                    if (result){
                        let token = jesontoken.sign({name: user.name}, 'verySecreteValue', {expiresIn: '1h'})
                        res.json({
                            message: 'Login Sucessfully',
                            token
                        })
                    }else{
                        res.json({
                            message: 'Password not Match'
                        })
                    }
                })
            }else{
                res.json({
                    message: 'No User Found'
                })
            }
        })

}

module.exports = {
    register,login
}