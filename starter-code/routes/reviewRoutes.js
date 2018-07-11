const express = require('express');
const reviewRouter = express.Router();
const Movie = require('../models/movie');

//takes you to new rewiew form
reviewRouter.get('/movies/:id/reviews/new', (req, res, next) => {
    Movie.findById(req.params.id)
        .then((theMovie) => {
            res.render('movies/movieReviewAdd', {movie: theMovie});
        })
        .catch(err => console.log('Error while adding movie review: ', err));
});

//posts review to DB 
reviewRouter.post('/movies/:id/reviews/create', (req, res, next) => {
    
    //fisrt argument is what you want to find, second is the update you want to run
    Movie.findByIdAndUpdate(req.params.id, { $push: { reviews: req.body } })
        .then(() => {
            res.redirect(`/movies/${req.params.id}`);
        })
        .catch(err => console.log('Error while creating movie review: ', err));
});


reviewRouter.post('/movies/:id/reviews/delete/:reviewIndex', (req, res, next) => {
    const movieID = req.params.id;
    const reviewIndex = req.params.reviewIndex;
    Movie.findById(movieID)
        .then((theMovieThatImEditing) => {
            theMovieThatImEditing.reviews.splice(reviewIndex, 1);
            theMovieThatImEditing.save()
                .then(() => {
                    res.redirect('/movies/' + movieID);
                })
                .catch(err => console.log('Error while saving the deleted review: ', err));
        })
        .catch(err => console.log('Error while splicing/deleting a review: ', err));
            
});





module.exports = reviewRouter;