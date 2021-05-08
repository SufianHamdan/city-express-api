const express = require('express');
const port = 3006;
const cors = require('cors');
const weather = require('./assets/weather.json');
require('dotenv').config();
const superagent = require('superagent');


const app = express();
app.use(cors());

const PORT = process.env.PORT || 3030;



const getweatherData = require('./modules/weather');
const getMoviesData = require('./modules/movies');




app.get('/', (req, res) => {
  res.send('Hello World');
});
app.get('/weather', getweatherData);
app.get('/movies', getMoviesData);



app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});  

