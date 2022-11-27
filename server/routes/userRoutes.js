const express = require('express')
const { json } = require('express')
const router = express.Router()
const UserSchema = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");

const JWT_SECRET = 'verySecretValuehcvdksheljlvkkl'

router.post('/signup', async (request, response) => {
    const saltpwd = await bcrypt.genSalt(10)
    const securepwd = await bcrypt.hash(request.body.password, saltpwd)
    
    
    const signedUpUser = new UserSchema({
        name: request.body.name,
        age: request.body.age,
        email: request.body.email,
        password: securepwd
    })
    signedUpUser.save()
    .then(data =>{
        response.json({res:"User added"})
    })
    .catch(error => {
        response.json(error)
    })
})

// router.post(`/login`, async (req, res, next) => {
//     const email = req.body.email
//     const password = req.body.password

//     if (!email || !password) {
//         res.status(400).json({ msg: 'Enter password and email' })
//     }

//     const user = await UserSchema.findOne({ email: email })
//     if (!user) {
//         res.json({
//             message: "User not found!"
//         })
//     }

//     // bcrypt.compare(password, user.password, (err, result) => {
//     //     if (err) {
//     //         res.json({
//     //             error: err
//     //         })
//     //     }
//     //     if (result) {
//     //         let token = jwt.sign({ name: user.name }, 'verySecretValue', { expiresIn: '24h' })
//     //         res,json({
//     //             message: 'Login Successful',
//     //             token
//     //         })
//     //     }
//     //     else {
//     //         res.json({
//     //             message: 'Password does not match!'
//     //         })
//     //     }
//     // })
//     const matchPassword = await bcrypt.compare(password, user.password)
//     if (matchPassword) {
//         const userSession = { email: user.email } 
//         req.session.user = userSession 
//         req.session.save();
//         return res
//             .status(200)
//             .json({ msg: 'Login Successful!', userSession })
//     }
//     else {
//         return res.status(400).json({ msg: 'Invalid credentials' })
//     }
// })


// router.get('/logout', async (req, res) => {
//     if (req.session.user) {
//         req.session.destroy(err => {
//             if (err)
//                 return res.status(500).send("Unable to Logout!");
//             else
//                 return res.status(200).json({ "msg": "Logout Successfull" });
//         })
//     }
// })


// router.get('/isAuth', async (req, res) => {
//     if (req.session.user) {
//         alert("user logged in")
//         return res.json(req.session.user)
//     } else {
//         return res.status(401).json('unauthorize')
//     }
// })

router.post('/login', async (req, res) => {

    const email = req.body.email
    const password = req.body.password
    const user = await UserSchema.findOne({ email })

    if (!user) {
        return res.json({ status: 'error', error: 'Invalid email'})
    }
    if (await bcrypt.compare(password, user.password)) {

        const token = jwt.sign({ 
            email: user.email,
            password: user.password
        }, JWT_SECRET, {expiresIn: '5h'})
        return res.json({status: 200, data: token})
    }

    res.json({status: 'error', error: 'Invalid password'})
})

module.exports = router