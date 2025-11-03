const express = require('express');
const cors = require('cors');
const { PORT } = require('./configuration/serverConfig');
const connectDb = require('./configuration/dbConfig');
const { router } = require('./routers/routes');

const app = express();

// parsing the req.body data through our main app server.....
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.post('/home', (req,res)=> {
    console.log("Hello world !!");
    res.status(200).send("Hello world !!!");
})

// http://localhost:7000/mba/api
app.use('/mba/api',router);



app.listen(PORT,async ()=> {
    await connectDb();
    console.log(`Successfully run the server at ${PORT}!!`);
});