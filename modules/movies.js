const superagent = require('superagent');
require('dotenv').config();

const MOVIE_API_KEY = process.env.MOVIE_API_KEY;

class Movie {
    constructor(movies){
      this.imgUrl = `https://image.tmdb.org/t/p/w500${movies.poster_path}`;
      this.title = movies.original_title;
      this.description = movies.overview;
      this.avrVotes = movies.average_votes;
      this.totVotes = movies.total_votes;
      this.pop = movies.popularity;
      this.rele = movies.released_on;
    }
  }


const getMoviesData = (req, res) => {
  
    try {
      const moviesUrlData = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${req.query.searchQuery}`;
      console.log(moviesUrlData);
    superagent.get(moviesUrlData).then(moviesData => {
      const arrOfMovies = moviesData.body.results.map(value => new Movie(value));
      console.log(arrOfMovies);
      res.send(arrOfMovies);
      
      console.log(req.query);
    }).catch(console.error);
    } catch (error) {
      res.send(error);
    }
  
    
  
  };

  module.exports = getMoviesData;

