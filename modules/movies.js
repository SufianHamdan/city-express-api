const superagent = require('superagent');
require('dotenv').config();

const MOVIE_API_KEY = process.env.MOVIE_API_KEY;

let cache = require('./cache');

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
      const queryVal = req.query.searchQuery;
      const moviesUrlData = `https://api.themoviedb.org/3/search/movie`;
      console.log(moviesUrlData);

      const queryParams = {
        api_key: MOVIE_API_KEY,
        query: req.query.searchQuery
      }
      
      if(cache[queryVal] !== undefined){ // is it stored ? yes === return cached data, No === go get it from the api
        res.send(cache[queryVal]);
        console.log('from cache');
      }else{ // it will only get the api if we don't have the data stored
        superagent.get(moviesUrlData).query(queryParams).then(moviesData => {      
          const arrOfMovies = moviesData.body.results.map(value => new Movie(value));
          console.log(arrOfMovies);
          cache[queryVal] = arrOfMovies; // Store in cache
          console.log('from api and store in cache');
          res.send(arrOfMovies);
          console.log(req.query);                     
      }).catch(console.error);

      }//else
     
    } catch (error) {
      res.send(error);
    } 
  };

  module.exports = getMoviesData;

