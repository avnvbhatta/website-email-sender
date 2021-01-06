//Required dependencies
const dotenv = require('dotenv').config();
const nodemailer = require("nodemailer");
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')


//Initialize Express
const app = express();
app.use(cors());

//Set port 
const port = process.env.PORT || 3008;

app.use(bodyParser.json()); 
app.use( bodyParser.urlencoded({ extended : true }) );

const instance = axios.create({
    baseURL: 'https://api.sendinblue.com/v3/',
    headers: {
        'accept': 'application/json',
        'api-key': `${process.env.API_KEY}`,
        'content-type': 'application/json'
    }
});

//POST route to receive user data and send email
app.post('/', async (req, res) => {
    //Get form data
    const {senderName, senderEmail, message} = req.body;
    let data = {  
        "sender": {  
           "name": senderName,
           "email": senderEmail
        },
        "to":[  
           {  
              "email": process.env.GMAIL,
           }
        ],
        "subject": "Email from Website",
        "htmlContent":`<html><head></head><body><h1>Email from ${senderName}</h1><h2>Email: ${senderEmail}</h2><br>${message}</body></html>`
     }
    try{
        
        let response = await instance.post('smtp/email', data);
        res.status(200).send("Message successfully sent.")
    }
    catch(error){
        console.log(error)
        res.status(500).send("An error occured.");
    }
    
})
  
 
app.listen(port, () => {
    console.log(`Mailer app listening at port ${port}`)
})