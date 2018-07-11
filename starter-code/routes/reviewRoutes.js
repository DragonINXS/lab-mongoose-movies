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

//deletes review from DB
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

//------------------------------Update below-------------------------

//updates a movie
// movieRouter.get('/movies/:id/edit/:reviewIndex', (req, res, next) => {
//     const movieID = req.params.id;
//     const reviewIndex = req.params.reviewIndex;

//     // console.log('id is: ', id);
//     Movie.findById(movieID)
//         .then(oneMovie => {
            
//             Celebrity.find()
//             .then((allTheCelebrities) => {
               

//                     res.render('movies/movieEdit', { movie: oneMovie, allTheCelebrities: allTheCelebrities });
                
//                 })
//                 .catch(err => console.log('Error while nested update: ', err));
//             // console.log('Is this one movie: ', oneMovie);
//         })
//         .catch(err => console.log('Error while updating movie: ', err));
// });

// //posts updates to DB
// movieRouter.post('/movies/:id/edited/:reviewIndex', (req, res, next) => {
//     const movieID = req.params.id;
//     const reviewIndex = req.params.reviewIndex;

    
//     const editedMovie = {
//         title: req.body.editedTitle,
//         genre: req.body.editedGenre,
//         plot: req.body.editedPlot,
//         cast: req.body.editedCast
//     };
//     // console.log('edited: ', editedMovie);
    
//     //findByIdAndUpdate needs 2 arguments id of movie and changes we saved in variable editedMovie
//     Movie.findByIdAndUpdate(movieId, editedMovie)
//         .then(() => {
//             res.redirect(`/movies/${movieId}`);
//         })
//         .catch(err => console.log('Error while saving the changes after editing: ', err));
// });



module.exports = reviewRouter;