
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
const jwt = require("jsonwebtoken");
const session = require("express-session");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Jegan1999$",
  database: "axcen",
});

app.post("/axcentech/axcentable", upload.single("resume"), (req, res) => {
  console.log("postcall");
  console.log("Received POST request at /axcentech/candidate");

  const { firstName, lastName, recipientEmail, phoneNumber, descriptionbox } =
    req.body;
  const resume = req.file ? req.file.filename : null;

  const queryString =
    "INSERT INTO axcentable (firstName, lastName, email, phoneNumber, descriptionbox, resume) VALUES (?,?,?,?,?,?);";

  const values = [
    firstName,
    lastName,
    recipientEmail,
    phoneNumber,
    descriptionbox,
    resume,
  ];

  db.query(queryString, values, (err, result) => {
    if (err) {
      console.error("Error inserting data into database:", err);
      return res
        .status(500)
        .json({ error: "Error inserting data into database" });
    }

    // Filter out null or undefined fields
    const responseData = Object.fromEntries(
      Object.entries(req.body).filter(
        ([key, value]) => value !== null && value !== undefined
      )
    );

    // Log the responseData
    console.log(responseData);
    sendApplicationEmail(
      firstName,
      lastName,
      recipientEmail,
      phoneNumber,
      descriptionbox,
      resume
    );
    res.status(200).json({ success: true, data: responseData });
  });
});

app.get("/doctorHome", (req, res) => {
  const selectQuery = "SELECT * FROM doctor";

  db.query(selectQuery, (err, data) => {
    if (err) {
      return res.json("Error", err);
    }
    console.log(data);
    return res.json(data);
  });
});

app.get("/uploads/:filename", (req, res) => {
  const fileName = req.params.filename;
  const filePath = path.join(__dirname, "uploads", fileName);

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("Error sending file:", err);
      res.status(500).send("Could not open the file.");
    }
  });
});

function sendApplicationEmail(
  firstName,
  lastName,
  recipientEmail,
  phoneNumber,
  descriptionbox,
  resume
) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "charup3111@gmail.com",
      pass: "mrrq ciri vpgd avto",
    },
  });

  const toEmail = recipientEmail;

  const mailOptions = {
    from: toEmail,
    to: "charup3111@gmail.com",
    subject: "Candidate Application",
    html: `First Name: <strong>${firstName}</strong><br/>
    Last Name: <strong>${lastName}</strong><br/>
    Email: <strong>${toEmail}</strong><br/>
    Contact Number: <strong>${phoneNumber}</strong><br/>
    Description: <strong>${descriptionbox}</strong><br/>
    Resume: <strong>${
      resume
        ? `<a href="http://localhost:3001/uploads/${resume}" target="_blank">View Resume</a>`
        : "No Resume Uploaded"
    }</strong><br/>`,
    text: `First Name: ${firstName},
    Last Name: ${lastName},
    Email: ${toEmail},
    Contact Number: ${phoneNumber},
    Description: ${descriptionbox},
    Resume: ${
      resume ? `http://localhost:3001/uploads/${resume}` : "No Resume Uploaded"
    },
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}

/* function sendApplicationEmail(
  firstName,
  lastName,
  recipientEmail,
  phoneNumber,
  descriptionbox,
  resume
) {
  // Create a nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "charup3111@gmail.com",
      pass: "mrrq ciri vpgd avto",
    },
  });

  const toEmail = recipientEmail;

  // Email options
  const mailOptions = {
    from: toEmail,
    to: "charup3111@gmail.com",
    subject: "Candidate Application",
    html: `First Name: <strong>${firstName}</strong><br/>
    Last Name: <strong>${lastName}</strong><br/>
    Email: <strong>${toEmail}</strong><br/>
    Contact Number: <strong>${phoneNumber}</strong><br/>
    Description: <strong>${descriptionbox}</strong><br/>
    Resume: <strong>${
      resume
        ? `<a href="http://localhost:3001/uploads/${resume}">Download</a>`
        : "No Resume Uploaded"
    }</strong><br/>
    `,
    text: `First Name: ${firstName},
    Last Name: ${lastName},
    Email: ${toEmail},
    Contact Number: ${phoneNumber},
    Description: ${descriptionbox},
    Resume: ${
      resume ? `http://localhost:3001/uploads/${resume}` : "No Resume Uploaded"
    },
    `,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
} */

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
