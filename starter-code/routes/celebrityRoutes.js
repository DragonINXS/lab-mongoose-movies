const express = require('express');
const router = express.Router();
const Celebrity = require('../models/celebrity');

// const Movie = require('../models/movie');

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




//creates new and adds to db
router.get('/celebrities/new', (req, res, next) => {
    res.render('celebrities/new');
});

router.post('/celebrities/create', (req, res, next) => {
    const newCeleb = new Celebrity({
        name: req.body.newName,
        occupation: req.body.newOccupation,
        catchPhrase: req.body.newCatchPhrase
    });
    
    Celebrity.create(newCeleb)
        .then((result) => {
            //takes you to the newly created celeb
            res.redirect(`/celebrities/${result._id}`);
        })
        .catch(err => console.log('Error while saving new celebrity: ', err));
});

//updates a celeb
router.get('/celebrities/edit/:celebId', (req, res, next) => {
    const id = req.params.celebId;
    // console.log('id is: ', id);
    Celebrity.findById(id)
        .then(oneCeleb => {
            // console.log('Is this one celeb: ', oneCeleb);
            res.render('celebrities/celebEdit', { celeb: oneCeleb });
        })
        .catch(err => console.log('Error while updating celebrity: ', err));
});

//posts updates to DB
router.post('/celebrities/edited/:id', (req, res, next) => {
    const celebId = req.params.id;
    
    const editedCeleb = {
        name: req.body.editedName,
        occupation: req.body.editedOccupation,
        catchPhrase: req.body.editedCatchPhrase
    };
    // console.log('edited: ', editedCeleb);
    
    //findByIdAndUpdate needs 2 arguments id of celeb and changes we saved in variable editedCeleb
    Celebrity.findByIdAndUpdate(celebId, editedCeleb)
        .then(() => {
            res.redirect(`/celebrities/${celebId}`);
        })
        .catch(err => console.log('Error while saving the changes after editing: ', err));
});

router.post('/celebrities/:celebrityId/delete', (req, res, next) => {
    const id = req.params.celebrityId;
    Celebrity.findByIdAndRemove(id)
        .then(() => {
            res.redirect('/celebrities');
        })
        .catch(err => console.log('Error while deleting celebrity: ', err));
});   


//gets their ID and sends them to show-which has their details
router.get('/celebrities/:id', (req, res, next) => {
    const id = req.params.id;
    Celebrity.findById(id)
        .populate('celebrities')
        .then((theCelebrity) => {
            //I have trouble res.render the right format/path - getting the hang of it now
            res.render('celebrities/celebDetails', theCelebrity);
        })
        .catch((err) => {
            console.log('Error while finding celebDetails: ', err);
        });
});
    
    module.exports = router;
    