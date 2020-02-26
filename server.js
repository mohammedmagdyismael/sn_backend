const express = require('express');
const connectDB = require('./config/db') 
const swaggerSetup = require('./config/swagger')

const app = express();
connectDB();

app.use(express.json({extended : false}))
app.use('/api/users',require('./routes/api/users'))
app.use('/api/profile',require('./routes/api/profile'))
app.use('/api/posts',require('./routes/api/posts'))
app.use('/api/auth',require('./routes/api/auth'))

app.get('/',(req,res)=>{
    return res.send("Social Network APIs")
})

const PORT = process.env.PORT || 5000;
swaggerSetup(PORT, app);
app.listen(PORT, ()=>{
    console.log(`Server Starts on Port ${PORT}`)
})


/**FOR MYSQL */
/* const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const Joi = require('joi');
  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
})); */
  

// connection configurations
/* var dbConn = mysql.createConnection({
    host: '52.51.139.250',
    user: 'aT4Xz9EyV84PyfW3',
    password: 'a44wVJzhqYq8D4ED',
    database: 'voffers20190704'
}); */
  
// connect to database
/* dbConn.connect(); 
 
 
// Retrieve all users 
app.get('/providerbundles', function (req, res) {
    let index = (Number(req.headers.pageindex) - 1) * 10 ;
    dbConn.query(`select * from servicecountries LIMIT ${index}, ${req.headers.pagesize}`, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'users list.' });
    });
}); */
 
 
// Retrieve user with id 
/* app.get('/user/:id', function (req, res) {
  
    let user_id = req.params.id;
  
    if (!user_id) {
        return res.status(400).send({ error: true, message: 'Please provide user_id' });
    }
  
    dbConn.query('SELECT * FROM users where id=?', user_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'users list.' });
    });
  
}); */
 
 
// Add a new user  
/* app.post('/user', function (req, res) {

    const schema = {
        "name": Joi.string().min(5).required(),
        "email": Joi.string().email({ minDomainAtoms: 2 })
    }

    const results = Joi.validate(req.body,schema)
    

    let user = req.body.name;
    console.log(results.error.details) */
    /*
    if (!user) {
        return res.status(400).send({ error:true, message: 'Please provide user' });
    }
  
    dbConn.query("INSERT INTO users SET ? ", { name: user }, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'New user has been created successfully.' });
    });
    */
});
 
 
//  Update user with id
/* app.put('/user', function (req, res) {
  
    let user_id = req.body.user_id;
    let user = req.body.user;
  
    if (!user_id || !user) {
        return res.status(400).send({ error: user, message: 'Please provide user and user_id' });
    }
  
    dbConn.query("UPDATE users SET user = ? WHERE id = ?", [user, user_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'user has been updated successfully.' });
    });
}); */
 
 
//  Delete user
/* app.delete('/user', function (req, res) {
  
    let user_id = req.body.user_id;
  
    if (!user_id) {
        return res.status(400).send({ error: true, message: 'Please provide user_id' });
    }
    dbConn.query('DELETE FROM users WHERE id = ?', [user_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'User has been updated successfully.' });
    });
});  */
 
//Environment Variable to Host the app on available PORT 
/* const port = process.env.PORT || 3000
 */
// set port
/* app.listen(port, function () {
    console.log(`Node app is running on port ${port}`);
});
 
module.exports = app; */


/**to local mondo */

// Imports
/* const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const Joi = require('joi');
const mongoclient = require('mongodb').MongoClient;
const assert = require('assert'); */


// Configs
/* app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); */

// Database Connection
/* const url = 'mongodb://localhost:27017';
const dbName = 'Products';
let productsdb = null; */

// Init Database Connection
/* const client = new mongoclient(url, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect((err)=> {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    productsdb = client.db(dbName);
    //client.close();
   }); */

  
 
// Routes

// Default Route
//app.get('/', function (req, res) {
    // Default Route Schema
/*     const headerSchema = {
    "languageid": Joi.number().required(),
    "countryid": Joi.number().required()
    }

    const results = Joi.validate(req.headers,headerSchema)
    console.log(results.error) */
    
  //  let cursor = productsdb.collection('productItems').find().toArray((err, results)=>{
    //    return res.send({ error: true, results })
      //  }
    //)
    
//});

// Get api/products
/* app.get('/api/products', (req,res)=>{
    return res.send("HERE")
}) */

// Get api/product
/* app.get('/api/product', (req,res)=>{
    let cursor = productsdb.collection('productItems')
                .find({countryid: Number(req.headers.countryid)})
                .toArray((err, results)=>{
                    return res.send({ error: true, results })
                }
                )
            }) */

// Post api/addproduct
/* app.post('/api/addproduct', (req,res)=>{
    
    productsdb.collection('productItems')
    .insertOne({  
        "productName": req.body.productName,
        "countryid": Number(req.body.countryid),
        "price": Number(req.body.price),
        "imageid": null
    },(err,respond)=>{
        return res.send(err)
    })  
}) */

// Post api/updateproduct
/* app.put('/api/updateproduct', (req,res)=>{
    return res.send("Update")
}) */


 
  
 
// Add a new user  
/* app.post('/user/:id', function (req, res) {
    let user_id = req.params.id;
    const schema = {
        "name": Joi.string().min(5).required(),
        "email": Joi.string().email({ minDomainAtoms: 2 })
    }

    const results = Joi.validate(req.body,schema)
    

    let user = req.body.name;
    console.log(results.error.details) */
    /*
    if (!user) {
        return res.status(400).send({ error:true, message: 'Please provide user' });
    }
  
    dbConn.query("INSERT INTO users SET ? ", { name: user }, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'New user has been created successfully.' });
    });
    
});*/
 
  
 
//Environment Variable to Host the app on available PORT 
/* const port = process.env.PORT || 3000

// set port
app.listen(port, function () {
    console.log(`Node app is running on port ${port}`);
});
 
module.exports = app; */
