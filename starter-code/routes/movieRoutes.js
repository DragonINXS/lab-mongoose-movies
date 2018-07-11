const express = require('express');
const movieRouter = express.Router();

const Movie = require('../models/movie');
const Celebrity = require('../models/celebrity');


movieRouter.get('/movies', (req, res, next) => {
    Movie.find()
        .populate('celebrity')
        .then(responseFromDB => {
            // console.log('Movies: ', responseFromDB);
            res.render('movies/movieList', {movies: responseFromDB});
        })
        .catch(err => {
            console.log('Error while getting movies from DB', err);
        });
});


//creates new movie
movieRouter.get('/movies/create', (req, res, next) => {
    Celebrity.find()
        .then((allTheCelebrities) => {
            console.log("all celebs ====================== ", allTheCelebrities);
            res.render('movies/movieNew', {allTheCelebrities});
        })
        .catch((err) => {
            console.log('Error while creating new Movie', err);
    });
});

//posts data from movieNew form
movieRouter.post('/movies/addMovie', (req, res, next) => {
    // console.log('BODY: ', req.body);
    const newMovie = { //how it was before
        // const newMovie = new Movie ({
        title: req.body.newTitle,
        genre: req.body.newGenre,
        plot: req.body.newPlot,
        cast: req.body.newCast
    };
    
    Movie.create(newMovie)
    .then(() => {
        //redirect always needs a '/' before
        res.redirect('/movies');
    })
    .catch(err => console.log('Error while saving new movie: ', err));
});

//updates a movie
movieRouter.get('/movies/edit/:movieId', (req, res, next) => {
    const id = req.params.movieId;
    // console.log('id is: ', id);
    Movie.findById(id)
        .then(oneMovie => {
            
            Celebrity.find()
            .then((allTheCelebrities) => {
                allTheCelebrities.forEach((celebrity) => {
                    console.log("-=-=-=-=-=-=-=-=-",oneMovie);
                        oneMovie.cast.forEach((correctCelebrity) => {
                            console.log(celebrity.name, correctCelebrity.name);
                            if (celebrity._id.equals(correctCelebrity)) {
                                celebrity.yes = true;
                            }
                                
                        });
                    });

                    res.render('movies/movieEdit', { movie: oneMovie, allTheCelebrities: allTheCelebrities });
                
                })
                .catch(err => console.log('Error while nested update: ', err));
            // console.log('Is this one movie: ', oneMovie);
        })
        .catch(err => console.log('Error while updating movie: ', err));
});

//posts updates to DB
movieRouter.post('/movies/edited/:id', (req, res, next) => {
    const movieId = req.params.id;
    
    const editedMovie = {
        title: req.body.editedTitle,
        genre: req.body.editedGenre,
        plot: req.body.editedPlot,
        cast: req.body.editedCast
    };
    // console.log('edited: ', editedMovie);
    
    //findByIdAndUpdate needs 2 arguments id of movie and changes we saved in variable editedMovie
    Movie.findByIdAndUpdate(movieId, editedMovie)
        .then(() => {
            res.redirect(`/movies/${movieId}`);
        })
        .catch(err => console.log('Error while saving the changes after editing: ', err));
});


//deletes movie from DB
movieRouter.post('/movies/:movieId/delete', (req, res, next) => {
    const id = req.params.movieId;
    Movie.findByIdAndRemove(id)
        .then(() => {
            res.redirect('/movies');
        })
        .catch(err => console.log('Error while deleting movie: ', err));
});


//gets by DB id - should be at the end of page
movieRouter.get('/movies/:theId', (req, res, next) => {
    const movieId = req.params.theId;
    // console.log('id: ', movieId)
    Movie.findById(movieId)
        .then(oneMovieFromDB => {
            Celebrity.find({ _id: oneMovieFromDB.cast })
                .then(castOfMovie => {
                    // console.log(":::::::::::::::::::::::::::::::::::::::: ", castOfMovie);
                    data = {
                        movie: oneMovieFromDB,
                        cast: castOfMovie
                    };
                    res.render('movies/movieDetails', data);
                });
            // console.log("movie details >>>>>>>>>>>>>>>>>>>>>>>> ", oneMovieFromDB);
        })
        .catch(err => console.log('Error while getting single movie from DB: ', err));
});

module.exports = movieRouter;
