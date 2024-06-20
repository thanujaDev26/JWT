const express = require('express');
const cors = require('cors');

require('dotenv').config();

//Import Router stack
let userRouter = require('./routers/user')
const studentRouter = require('./routers/student');


const app = express();

//Middleware stack
app.use(express.json());
app.use(cors());
const auth = require('./middleware/auth');


//Routes stack
app.use('/api/user',userRouter);
app.use('/api/student',auth,studentRouter);


module.exports = app;
