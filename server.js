const express = require('express');
const port = 3006;
const cors = require('cors');
const weather = require('./assets/weather.json');
require('dotenv').config();
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3030;

app.get('/', (req, res) => {
  res.send('Hello World');
})

app.get('/weather', (req, res) => {
  const arrOfData = weather.data.map(data => new Weather(data));
  res.send(arrOfData);
});


app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});  

class Weather{
  constructor(data){
    this.date = data.valid_date;
    this.description = data.weather.description;
  }
}