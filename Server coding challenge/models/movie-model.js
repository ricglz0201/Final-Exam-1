const mongoose = require( 'mongoose' );

const moviesSchema = mongoose.Schema({
    movie_ID : {
        type : Number,
        unique : true,
        required : true
    },
    movie_title : {
        type : String,
        required : true
    },
    year :  {
        type : Number,
        required : true
    },
    rating : {
        type : Number,
        required : true
    },
    actors : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'actors',
        required : true
    }]
});

const moviesCollection = mongoose.model( 'movies', moviesSchema );

const Movies = {
    createMovie : function( newMovie ){
        return moviesCollection
                .create( newMovie )
                .then( createdMovie => {
                    return createdMovie;
                })
                .catch( err => {
                    throw new Error( err );
                });
    },
  findMovieByID: async function (movie_ID) {
    try {
      return await moviesCollection.findOne({ movie_ID });
    } catch (err) {
      throw new Error(err);
    }
  },
  addActorToMovieList: async function(movie) {
    try {
      const { movie_ID } = movie;
      return await moviesCollection.findOneAndUpdate({ movie_ID }, movie);
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = {
    Movies
};
