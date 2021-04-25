const express = require('express');
const config = require('./config/config-app');
require('./db/db');
const app = express();



// connect database
/*db
    .authenticate()
    .then(() => {
        console.info('Database connected.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    })
*/
//set port
app.set('port', process.env.PORT || config.port);

//dev 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routers
app.use('/api/user', require('./router/user.router'));
app.use('/api/crypto', require('./router/crypto.router'));


// star the server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
})