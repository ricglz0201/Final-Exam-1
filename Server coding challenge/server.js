const bodyParser = require( 'body-parser' );
const express = require( 'express' );
const jsonParser = bodyParser.json();
const mongoose = require( 'mongoose' );
const { Actors } = require('./models/actor-model.js');
const { DATABASE_URL, PORT } = require( './config' );
const { Movies } = require('./models/movie-model.js');

const app = express();

function hasActor(actors, actor) {
  const wantedId = actor._id;
  return actors.filter(({ _id }) => _id === wantedId).length === 1;
}

app.patch('/api/add-movie-actor/:movie_ID', jsonParser, async (req, res) => {
  const { id, firstName, lastName } = req.body;
  if(!id) {
    // "Id is missing in the body of the request"
  }
  const { movie_ID } = req.params;
  if(id != movie_ID) {
    // "Id and movie_ID do not match"
  }
  if(!firstName || !lastName) {
    // "You need to send both firstName and lastName of the actor to add to the movie list".
  }
  try {
    const movie = await Movies.findMovieByID(id);
    const actor = await Actors.findActorByName({ firstName, lastName });
    if(!movie || !actor) {
      // "The actor or movie do not exist".
    }
    if(hasActor(movie.actors, actor)) {
      // "The actor is already in the movie list".
    }
    movie.actors.push(actor);
    await Movies.addActorToMovieList();
    return res.json(movie).status(201);
  } catch (err) {
    // Show error with 500
  }
})

app.listen( PORT, () => {
    console.log( "This server is running on port 8080" );
    new Promise( ( resolve, reject ) => {
        const settings = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        };
        mongoose.connect( DATABASE_URL, settings, ( err ) => {
            if( err ){
                return reject( err );
            }
            else{
                console.log( "Database connected successfully." );
                return resolve();
            }
        })
    })
    .catch( err => {
        console.log( err );
    });
});
