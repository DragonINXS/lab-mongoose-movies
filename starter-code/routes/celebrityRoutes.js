const express = require('express');
const router = express.Router();
const Celebrity = require('../models/celebrity');

//lists all by name and had link to details
router.get('/celebrities', (req, res, next) => {
    Celebrity.find()
        .then((listOfCelebrities) => {
            res.render('celebrities', { listOfCelebrities });
        })
        .catch((err) => {
            next(err);
        });
});


//gets their ID and sends them to show-which has their details
router.get('/celebrities/:id', (req, res, next) => {
    const id = req.params.id;
    Celebrity.findById(id)
        .then((theCelebrity) => {
            //I have trouble res.render the right format/path - getting the hang of it now
            res.render('celebrities/show', theCelebrity);
        })
        .catch((err) => {
            next(err);
        });
});


//creates new and adds to db
router.get('/celebrities/new', (req, res, next) => {
    res.render('celebrities/new');
});

router.post('/celebrities/create', (req, res, next) => {
    //fancy way of doing the below
    const newCeleb = new Celebrity(req.body);
    // const newCeleb = new Celebrity({
    //     name: req.body.name,
    //     occupation: req.body.occupation,
    //     catchPhrase: req.body.catchPhrase
    // })

    newCeleb.save()
        .then((response) => {
            res.redirect('/celebrities');
        })
        .catch((err) => {
            res.render('celebrities/new');
            // next(err);
        });
});

module.exports = router;
