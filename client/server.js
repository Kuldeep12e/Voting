// Node.js server (backend)

const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require('cors');
const generateEmailTemplate = require("../emailtemplate");


const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "lazylearner41@gmail.com", // Your Gmail email address
    pass: "yppubpjzmkpuglog", // Your Gmail password
  },
});

// Route to handle adding candidates
app.post("/api/addCandidate", async (req, res) => {
  const { name, email } = req.body;

  const description = "You have registered as a candidate in the Blockchain voting process. Your participation is crucial in ensuring a fair and transparent election.";

  try {
    // Add the candidate to the blockchain

    // Send email to the candidate
    const mailOptions = {
      from: "BloackBallot",
      to: email,
      subject: "Welcome!",
      html: generateEmailTemplate(name, description), // Generate email template with name and custom description
    };


    await transporter.sendMail(mailOptions); // Send email

    console.log("Candidate added to the blockchain and email sent successfully");
    res.status(200).send({ success : true , message: "Candidate added to the blockchain and email sent successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error adding candidate to the blockchain or sending email");
  }
});



//add voter logic 


app.post('/api/addVoter', async (req, res) => {
    const { name, email, address } = req.body;

    const description = `You have added as voter in the Blockchain voting process. Your participation is crucial in ensuring a fair and transparent election Please login using your wallet address.  ${address}`
  
    try {
    
    
        const mailOptions = {
          from: "BloackBallot",
          to: email,
          subject: "Welcome!",
          html: generateEmailTemplate(name, description), 
        };
    
    
        await transporter.sendMail(mailOptions); 
    
        console.log("Voter added to the blockchain and email sent successfully");
        res.status(200).send({ success : true , message: "Voter added to the blockchain and email sent successfully" });
      } catch (error) {
        console.log(error);
        res.status(500).send("Voter adding candidate to the blockchain or sending email");
      }
  });







app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
