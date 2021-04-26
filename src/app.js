const express = require('express');
require('dotenv').config();

// inicio conecciona BD
require('./db/db');

const app = express();

// set port
app.set('port', process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routers
app.use('/api/user', require('./router/user.router'));
app.use('/api/coin', require('./router/coin.router'));

// star server
app.listen(app.get('port'), () => {
    console.log(`- server on port ${app.get('port')}`);
})