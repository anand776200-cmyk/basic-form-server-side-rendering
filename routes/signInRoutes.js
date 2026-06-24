const express = require('express');
const router = express.Router();
const user = require('../model/user');
const bcrypt = require('bcrypt');
// const user = require('../model/user');

router.get('/', (req, res) => {
    // res.send('working..');
    res.render('home');
})

router.get('/signIn', (req, res) => {
    res.render('signInForm');
})

router.get('/logIn', (req, res) => {
    res.render('log_in_form');
})

router.post('/check', async (req, res) => {
    const { name, password } = req.body;
    if (name && name.length) {
        const data = await user.findOne({ name: name });
        if (data == null) return res.send("user with this name does not exit...");
        const checkPw = data.password;

        const check = await bcrypt.compare(password, checkPw);
        if (check) {
            return res.send("welcome .... you are logged in...");
        }
    }
    return res.send("Invalid User name || Password");
})

router.post('/loggedIn', async (req, res) => {
    // res.send('working...')
    const { name, password } = req.body;
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user1 = user({ name, password: hashedPassword });
    await user1.save();
    res.send('welcome');
})




module.exports = router;