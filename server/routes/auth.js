const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {
    console.log(req.body);
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPass
        })

        const user = await newUser.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
})

router.post('/login', async (req, res) =>{
    try {

        const user = await User.findOne({ email: req.body.email });
        if(!user)
            return res.status(404).json("Email not found");
    
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword)
            return res.status(400).json("Wrong password")
    
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;