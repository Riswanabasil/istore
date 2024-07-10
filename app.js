const express= require("express")
const mongoose= require("mongoose")
const bodyParser =require("body-parser")
const dotenv=require("dotenv")
const path=require("path")
const multer=require("multer")
const session = require('express-session');
const passport = require('./config/passport');

dotenv.config()

const app=express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine','ejs')

// console.log('MongoDB URI:', process.env.MONGODB_URI);


mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Connected to MongoDB')
}).catch(err => {
    console.error('Error connecting to MongoDB', err)
});

app.use(session({ secret: 'secret', resave: false, saveUninitialized: false, secret:process.env.SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());

const indexRoute=require("./routes/index")
const usersRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const adminRoute=require("./routes/admin")
const categoryRoutes = require('./routes/category')

app.use("/",indexRoute)
app.use('/users', usersRoute)
app.use('/auth', authRoute)
app.use('/admin',adminRoute)
app.use('/admin', categoryRoutes)

const PORT=process.env.PORT ||3000
app.listen(PORT,()=>{
    console.log(`server is runnig on ${PORT}`)
})