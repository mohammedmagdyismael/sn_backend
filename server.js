const express = require('express');
const connectDB = require('./config/db') 
const swaggerSetup = require('./config/swagger')
var bugsnag = require('@bugsnag/js')
var bugsnagExpress = require('@bugsnag/plugin-express')
var bugsnagClient = bugsnag('f87536c886e1ec7a4c4c896e3ef781a2')

bugsnagClient.use(bugsnagExpress)

const app = express();
const bugsnagmiddleware = bugsnagClient.getPlugin('express')
module.exports = bugsnagClient;
connectDB();

app.use(express.json({extended : false}))
app.use(bugsnagmiddleware.requestHandler)
app.use(bugsnagmiddleware.errorHandler)
//bugsnagClient.notify(new Error('Test error'))
app.use('/api/users',require('./routes/api/users'))
app.use('/api/profile',require('./routes/api/profile'))
app.use('/api/posts',require('./routes/api/posts'))
app.use('/api/auth',require('./routes/api/auth'))

app.get('/',(req,res)=>{
    try{
        const x = 'mm';
        x = 'n';
        return res.send("Social Network APIs")
    }
    catch(e){
        bugsnagClient.notify(e)
    }  
})

const PORT = process.env.PORT || 5000;
swaggerSetup(PORT, app);
app.listen(PORT, ()=>{
    console.log(`Server Starts on Port ${PORT}`)
})