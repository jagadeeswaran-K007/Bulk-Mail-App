const express = require("express");
const app = express();
const cors = require("cors");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const dns = require('dns');

// Fix DNS resolution issues
dns.setServers(['8.8.8.8', '8.8.4.4']);

require('dotenv').config(); // Load variables from .env file

app.use(cors());
app.use(express.json());

// Base connection URI without database name
const baseURI = process.env.MONGO_BASE_URI;
const queryParams = "?retryWrites=true&w=majority&appName=Cluster001";

// 1. Create connections to 3 separate databases
const loginConn = mongoose.createConnection(`${baseURI}/Login${queryParams}`);
const passkeyConn = mongoose.createConnection(`${baseURI}/passkey${queryParams}`);
const emailConn = mongoose.createConnection(`${baseURI}/Email${queryParams}`);

// Connection logs
loginConn.on("connected", () => console.log("Connected to 'Login' DB"));
passkeyConn.on("connected", () => console.log("Connected to 'passkey' DB"));
emailConn.on("connected", () => console.log("Connected to 'Email' DB"));

// 2. Define Models attached to their specific database connections
// Database 1: 'Login' DB -> 'Users' Collection
const userModel = loginConn.model("Users", { username: String, pass: String }, "Users");

// Database 2: 'passkey' DB -> 'bulkmail' Collection
const credential = passkeyConn.model("credential", {}, "bulkmail");

// Database 3: 'Email' DB -> 'History' Collection
const historyModel = emailConn.model("History", {
    subject: String,
    msg: String,
    emailList: Array,
    status: String,
    date: { type: Date, default: Date.now }
}, "History");


// 3. Admin Login API (Checks 'Login' DB)
app.post("/login", (req, res) => {
    let { username, pass } = req.body;

    userModel.find({ username: username, pass: pass })
        .then((data) => {
            if (data.length > 0) {
                res.send(true);
            } else {
                res.send(false);
            }
        })
        .catch(() => res.send(false));
});


// 4. Send Email API (Gets credentials from 'passkey' DB & saves log in 'Email' DB)
app.post("/sendemail", (req, res) => {
    let subject = req.body.subject || "A Message from Bulk Mail App";
    let msg = req.body.msg;
    let emailList = req.body.emailList;

    // Fetch Nodemailer user/pass from 'passkey' DB -> 'bulkmail' collection
    credential.find().lean()
        .then((data) => {
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: data[0].user,
                    pass: data[0].pass
                }
            });

            new Promise(async (resolve, reject) => {
                try {
                    for (let i = 0; i < emailList.length; i++) {
                        await transporter.sendMail({
                            from: data[0].user,
                            to: emailList[i],
                            subject: subject,
                            text: msg
                        });
                        console.log("Email Sent to: " + emailList[i]);
                    }
                    resolve("Success");
                } catch (error) {
                    reject("Failed");
                }
            })
            .then(async () => {
                // Save success log to 'Email' DB -> 'History' collection
                await historyModel.create({ subject, msg, emailList, status: "success" });
                res.send(true);
            })
            .catch(async () => {
                // Save failed log to 'Email' DB -> 'History' collection
                await historyModel.create({ subject, msg, emailList, status: "failed" });
                res.send(false);
            });
        })
        .catch((error) => {
            console.log(error);
            res.send(false);
        });
});

// 5. Fetch History API (Fetches from 'Email' DB -> 'History' collection)
app.get("/gethistory", (req, res) => {
    historyModel.find().sort({ date: -1 })
        .then((data) => res.send(data))
        .catch(() => res.send([]));
});

app.listen(5000, () => { console.log("Server Started on port 5000"); });