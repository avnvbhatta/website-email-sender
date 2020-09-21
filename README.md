# Website Email Sender

Website Email Sender is a lightweight Node.js app built using Nodemailer and Express to send emails. The app sends an email by simply sending a POST request to an endpoint.

## Installation

Download the zip folder and extract the files.

Create a '.env' file within the same folder hierarchy as index.js. Edit the .env file to have the following variables.

```bash
GMAIL_NODEMAILER_EMAIL=example@gmail.com
GMAIL_NODEMAILER_PASSWORD=mygmailpassword
```

```bash
node index.js
```


The current configuration uses Gmail's SMTP credentials to send emails from a gmail account. Please replace the SMTP credentials for using it with other email services. More details on this can be found at [NodeMailer](https://nodemailer.com/).
## Usage

```bash
node index.js
```
After the Express server is running, send a POST request with the following body parameters are configured to be x-www-form-urlencoded.

Request body:

```bash
senderName
senderEmail
message
```

After the request is successfully sent, a response "Message successfully sent." will be received.

# Questions/Concerns/Issues
Please do not hesitate to contact me.

