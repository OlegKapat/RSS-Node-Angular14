const express=require('express');
const app=express();
const mongoose=require('mongoose');
const bodyParser = require('body-parser');
const article=require('./routes/article')
const login=require('./routes/login')
const passport=require('passport');
require('dotenv').config()



mongoose.set("strictQuery", false);
mongoose.connect(process.env.Mongo_URI,{useNewUrlParser: true,useUnifiedTopology: true}).then(()=>console.log("MongoDB подключена")).catch(error=>console.log(error));

app.use(require('morgan')('dev'));
require('./middleware/passport')(passport);
app.use(passport.initialize());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(require('cors')());
app.use('/api/article',article);
app.use('/api/login',login);


if(process.env.NODE_ENV==='production'){
    app.use(express.static('/client/dist/client'))
    app.get('*',(req,res)=>{
    })
}

module.exports=app;