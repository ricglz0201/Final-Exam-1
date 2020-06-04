const bodyParser = require( 'body-parser' );
const errorHandler = require('./middleware/errorHandler.js');
const express = require( 'express' );
const jsonParser = bodyParser.json();
const mongoose = require( 'mongoose' );
const { Actors } = require('./models/actor-model.js');
const { DATABASE_URL, PORT } = require( './config' );
const { Movies } = require('./models/movie-model.js');

const app = express();
app.use(errorHandler);

function hasActor(actors, actor) {
  const wantedId = actor._id;
  return actors.filter(({ _id }) => _id === wantedId).length === 1;
}

app.patch('/api/add-movie-actor/:movie_ID', jsonParser, async (req, res) => {
  const { id, firstName, lastName } = req.body;
  if(!id) {
    return req.fieldMissingInBody('Id', res);
  }
  const { movie_ID } = req.params;
  if(id != movie_ID) {
    return req.fieldsDontMatch('id', 'movie_ID', res);
  }
  if(!firstName || !lastName) {
    return req.fieldsMissing('firstName', 'lastName', res);
  }
  try {
    const movie = await Movies.findMovieByID(id);
    if(!movie) {
      return req.notFound('movie', res);
    }
    const actor = await Actors.findActorByName({ firstName, lastName });
    if(!actor) {
      return req.notFound('actor', res);
    }
    if(hasActor(movie.actors, actor)) {
      return req.alreadyExisted('actor', res);
    }
    movie.actors.push(actor);
    await Movies.addActorToMovieList();
    return res.json(movie).status(201);
  } catch (err) {
    return req.errorMessage('Problem with the database', 500, res);
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
