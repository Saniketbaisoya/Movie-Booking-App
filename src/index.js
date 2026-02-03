const express = require('express');
const { PORT } = require('./configuration/serverConfig');
const connectDb = require('./configuration/dbConfig');
const { router } = require('./routers/routes');
const { default: mongoose } = require('mongoose');

const app = express();

// parsing the req.body data through our main app server.....
app.use(express.json());
app.use(express.urlencoded({extended : true}));

mongoose.set('debug', true);

// http://localhost:9999/mba/api
app.use('/mba/api',router); // invoking the router in app.


app.listen(PORT,async ()=> {
    
    await connectDb();
    console.log(`Successfully run the server at ${PORT}!!`);
});