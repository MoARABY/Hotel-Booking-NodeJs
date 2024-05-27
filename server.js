const express = require('express');
const app = express();
require('dotenv').config();
const dbConnection = require('./config/dbConnection');
const cookieParser = require('cookie-parser');
const helmet=require('helmet');
const cors=require('cors');


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(helmet());
app.use(cors());
// const errorHandler=require('./utils/errorHandler');

// import routes
const userRoute = require('./routes/userRoute');
const hotelRoute = require('./routes/hotelRoute');
const roomRoute = require('./routes/roomRoute');
const authRoute = require('./routes/authRoute');

// start requests =================================
app.get("/",(req,res)=>{
    res.send("booking apis");
})
app.use('/api/auth',authRoute);
app.use('/api/hotel',hotelRoute);
app.use('/api/user',userRoute);
app.use('/api/room',roomRoute);
//=================================================

// connect to the database
const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
    dbConnection();
})




