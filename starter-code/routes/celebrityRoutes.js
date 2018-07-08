const express = require('express');
const router = express.Router();
const Celebrity = require('../models/celebrity');

router.get('/celebrities', (req, res, next) => {
    Celebrity.find()
        .then((listOfCelebrities) => {
            res.render('celebrities', { listOfCelebrities });
        })
        .catch((err) => {
            next(err);
        });
});

router.get('/celebrities/:id', (req, res, next) => {
    const id = req.params.id;
    Celebrity.findById(id)
        .then((theCelebrity) => {
            res.render('celebDetails', theCelebrity);
        })
        .catch((err) => {
            next(err);
        });
});

module.exports = router;
