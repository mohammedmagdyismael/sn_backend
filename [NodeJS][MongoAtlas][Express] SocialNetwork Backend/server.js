const express = require('express');
const connectDB = require('./config/db') 

const app = express();
app.use(express.json({extended : false}))

connectDB();

app.use('/api/users',require('./routes/api/users'))
app.use('/api/profile',require('./routes/api/profile'))
app.use('/api/posts',require('./routes/api/posts'))
app.use('/api/auth',require('./routes/api/auth'))



app.get('/',(req,res)=>{
    return res.send("Social Network APIs")
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server Starts on Port ${PORT}`)
})