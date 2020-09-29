//Required dependencies
const dotenv = require('dotenv').config();
const nodemailer = require("nodemailer");
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')

//Initialize Express
const app = express();
app.use(cors());

//Set port 
const port = process.env.PORT || 3008;

app.use(bodyParser.json()); 
app.use( bodyParser.urlencoded({ extended : true }) );

//POST route to receive user data and send email
app.post('/', async (req, res) => {
    //Get form data
    const {senderName, senderEmail, message} = req.body;
    try{
        let mailAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
            user: process.env.GMAIL_NODEMAILER_EMAIL, // gmail email
            pass: process.env.GMAIL_NODEMAILER_PASSWORD, // gmail password
            },
        });
    
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: `${senderName} <${senderEmail}>`, // sender address
            to: `${process.env.GMAIL_NODEMAILER_EMAIL}, ${process.env.GMAIL_PRIMARY}`, // list of receivers
            subject: "Important! Email from website!", // Subject line
            html: `<h1>Message from ${senderName}</h1><h2>Email: ${senderEmail}</h2><br>${message}`, // html body
        });

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