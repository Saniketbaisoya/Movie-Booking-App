const express = require('express');
const { PORT } = require('./configuration/serverConfig');
const connectDb = require('./configuration/dbConfig');
const app = express();

app.listen(PORT,async ()=> {
    console.log(`Successfully run the server at ${PORT}!!`);
    await connectDb();
})