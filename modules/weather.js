const weather = require('../assets/weather.json');
const superagent = require('superagent');
require('dotenv').config();

class Weather{
    constructor(data){
      this.date = data.valid_date;
      this.description = data.weather.description;
    }
}


const getweatherData = ('/weather', (req, res) => {
  
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

  module.exports = getweatherData;