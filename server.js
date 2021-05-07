const express = require('express');
const port = 3006;
const cors = require('cors');
const weather = require('./assets/weather.json');
require('dotenv').config();
const superagent = require('superagent');


const app = express();
app.use(cors());
const PORT = process.env.PORT || 3030;
const WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY;
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;

app.get('/', (req, res) => {
  res.send('Hello World');
})



app.get('/weather', (req, res) => {
  
  try {
    console.log(req.query);
  const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_BIT_KEY}&lat=${req.query.lat}&lon=${req.query.lon}`;
  console.log(weatherBitUrl);
  superagent.get(weatherBitUrl).then(weatherBitData => {
    const arrOfData = weatherBitData.body.data.map(data => new Weather(data));
    res.send(arrOfData);

  }).catch(console.error);
  } catch (error) {
    const arrOfData = weather.data.map(data => new Weather(data));
    res.send(arrOfData);
  }
  
  
});

app.get('/movies', (req, res) => {
  
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

  

})


app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});  

class Weather{
  constructor(data){
    this.date = data.valid_date;
    this.description = data.weather.description;
  }
}

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