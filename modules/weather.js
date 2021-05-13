const weather = require('../assets/weather.json');
const superagent = require('superagent');
require('dotenv').config();

let cache = require('./cache');

const WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY;

class Weather{
    constructor(data){
      this.date = data.valid_date;
      this.description = data.weather.description;
    }
}


const getweatherData = ('/weather', (req, res) => {
  
    try {
      const key = 'weather-'+ req.query.lat + req.query.lon;
      const params = {
      key: WEATHER_BIT_KEY,
      lat: req.query.lat,
      lon: req.query.lon
    }; // params
    console.log(req.query);

    if (cache[key]) {
      res.send(cache[key]);
      console.log('from cache');
    } // if
    else {

    const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily`;
    console.log(weatherBitUrl);

    superagent.get(weatherBitUrl).query(params).then(weatherBitData => {
      const arrOfData = weatherBitData.body.data.map(data => new Weather(data));
      cache[key] = arrOfData;
      res.send(arrOfData);
      console.log('from Api server and cached');
  
    });
    }//else
    
    }// try
     catch (error) {
      const arrOfData = weather.data.map(data => new Weather(data));
      res.send(arrOfData);
    } // catch
    
    
  });

  module.exports = getweatherData;