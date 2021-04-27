const express = require('express');
require('dotenv').config();

// inicio conexion a BD
require('./src/db/db');

const app = express();

// set port
app.set('port', process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routers
app.use('/api/user', require('./src/router/user.router'));
app.use('/api/coin', require('./src/router/coin.router'));

// star server
app.listen(app.get('port'), () => {
    console.log(`- server on port ${app.get('port')}`);
})