const mongoose = require('mongoose');
const Celebrity = require('../models/celebrity');
const Movie = require('../models/movie');

// const Celebrities = (require('../models/authors));

const dbName = 'starter-code';
mongoose.connect(`mongodb://localhost/${dbName}`);

const celebrities = [

    {
        name: 'Thor',
        occupation: 'Protector of Natalie Portman',
        catchPhrase: 'Where is Nat Port?'
    },
    
    {
        name: 'Odin',
        occupation: 'Sleeping',
        catchPhrase: 'ZZZZZzzzzz'
    },

    {
        name: 'Loki',
        occupation: 'Being a dick',
        catchPhrase: "I do what I want"
    }

];

Celebrity.create(celebrities)
    .then((result) => {
        console.log('created ${result.length} celebrities');
        mongoose.disconnect();
    })
    .catch((err) => {
        console.log(err);
    });

const moviesArray = [
    {
        title: 'Layer Cake',
        genre: 'British Gangster flick',
        plot: 'Awesome'
        
    },
    {
        title: 'From Paris With Love',
        genre: 'Action',
        plot: 'Waxed'
    },
    {
        title: 'Pain and Gain',
        genre: 'Documentary',
        plot: 'Miami'
    }
];


// use .create() to create entries in DB
Movie.create(moviesArray)
    .then(movies => {
        movies.forEach(oneMovie => {
            console.log('In DB: ', oneMovie.title);
        });
        mongoose.disconnect();
    })

    .catch(err => console.log('Error while creating seeds: ', err));


    