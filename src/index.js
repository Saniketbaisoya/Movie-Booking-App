const express = require('express');
const { PORT } = require('./configuration/serverConfig');
const connectDb = require('./configuration/dbConfig');
const { router } = require('./routers/routes');

const app = express();

// parsing the req.body data through our main app server.....
app.use(express.json());
app.use(express.urlencoded({extended : true}));

// http://localhost:7000/mba/api
app.use('/mba/api',router);


app.listen(PORT,async ()=> {
    await connectDb();
    console.log(`Successfully run the server at ${PORT}!!`);
});