const express = require('express');
const userRouter = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');


userRouter.get('/signup', (req, res, next) => {
    res.render('users/signupPage');
});


userRouter.post('/signup', (req, res, next) => {
    const thePassword = req.body.thePassword;
    const theUsername = req.body.theUsername;
    
    if (thePassword === "" || theUsername === "") {
        res.render('users/signupPage', { errorMessage: 'Please fill out Username and Password to create an account' });
        return;
    }
    
    User.findOne({ username: theUsername })
    .then((responseFromDB) => {
        if (responseFromDB !== null) {
            res.render('users/signupPage', { errorMessage: `Sorry Username: ${theUsername} is already taken` });
            return;
        }

        //hashes password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(thePassword, salt);
        
        User.create({ username: theUsername, password: hashedPassword })
            .then(() => {
                res.redirect('/');
            })
            .catch(err => console.log('Error while saving signup: ', err));
    });
    
});

userRouter.get('/login', (req, res, next) => {
    res.render('users/loginPage');
});

userRouter.post('/login', (req, res, next) => {
    const theUsername = req.body.theUsername;
    const thePassword = req.body.thePassword;

    if (theUsername === "" || thePassword === "") {
        console.log("first if statement")
        res.render("users/loginPage", {errorMessage: "Indicate a username and a password to log in"});
        return;
    }
        
    User.findOne({ "username": theUsername }, (err, user) => {
        if (err || !user) {
            console.log("second if statement")
            res.render("users/loginPage", { errorMessage: "Sorry that username doesn't exist" });
            return;
        }
        if (bcrypt.compareSync(thePassword, user.password)) {
            // Save the login in the session!
            req.session.currentUser = user;
            console.log("third if statement", user)
            res.redirect("/");
        } else {
            console.log("fourth if statement")
            res.render("users/loginPage", { errorMessage: "Incorrect password" });
        }
    }); //ends callback that runs after the User.findOne
}); // ends the route






module.exports = userRouter;