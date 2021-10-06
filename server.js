const express = require('express');
const path = require('path');

const productsRoutes = require('./routes/products.routes');
const ordersRoutes = require('./routes/orders.routes');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// odblokowanie wszystkich połączeń
app.use(cors());

// API
app.use('/api', productsRoutes);
app.use('/api', ordersRoutes);
// API errors
app.use('/api', (req, res) => {
  res.json({message: 'Not found'});
});

// Server to client
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server started on port 8000');
});


const devDBString = process.env.TAILORED_DB_STRING;
const testDBString = 'mongodb://localhost:27017/tailoredDB';
// process.env prowadzi do bazy Atlas, więc dla lokalnego uruchomienia developerskiego wykomentuj tę linię
// const dbURI = process.env.NODE_ENV === 'test' ? testDBString : devDBString;
const dbURI = testDBString;


mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

module.exports = server;
/*
/home/mzb/works/kodilla/tailored-fashion-react/products.json
mongoimport --uri "connection string goes here" --collection products --drop --file /home/mzb/works/kodilla/tailored-fashion-react/products.json --jsonArray

*/
