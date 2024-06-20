const express = require('express');
const cors = require('cors');

require('dotenv').config();

//Router
let userRouter = require('./routers/user')
const studentRouter = require('./routers/student');


const app = express();

//Middleware
app.use(express.json());
app.use(cors());
const auth = require('./middleware/auth');


app.use('/api/user',userRouter);
app.use('/api/student',auth,studentRouter);


module.exports = app;
