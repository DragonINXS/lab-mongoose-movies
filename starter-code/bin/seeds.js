const mongoose = require('mongoose');
const Celebrity = require('../models/celebrity');

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
        catchPhrase: "I do what I wany"
    }

];

Celebrity.create(celebrities)
    .then((result) => {
        console.log('created ${result.length} celebrities');
        mongoose.disconnect();
    })
    .catch((err) => {
        console.log(err)
    });