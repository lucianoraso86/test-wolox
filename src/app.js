const express = require('express');
const config = require('./config/config-app');
require('./db/db');
const app = express();


//set port
app.set('port', process.env.PORT || config.port);

//dev 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routers
app.use('/api/user', require('./router/user.router'));
app.use('/api/coin', require('./router/coin.router'));

// star the server
app.listen(app.get('port'), () => {
    console.log(`- server on port ${app.get('port')}`);
})