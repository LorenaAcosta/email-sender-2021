const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const details = require("./details.json");

const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.listen(process.env.PORT || 3000, () => {
    console.log("The server started on port 3000 !!!!!!");
});

app.get("/", (req, res) => {
    res.send(
        "<h1 style='text-align: center'>Bienvenido al Email Sender Server <br><br>😃👻😃👻😃👻😃👻😃</h1>"
    );
});

app.post("/sendmail", (req, res) => {
    console.log("request came");
    let user = req.body;
    sendMail(user, info => {
        console.log(`The mail has beed send 😃 and the id is ${info.messageId}`);
        res.send(info);
    });
});

async function sendMail(user, callback) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'lorena.acosta95@gmail.com',
            pass: 'wmkaglykolfnhvjf'
        }
    });

    let mailOptions = {
        from: '"Correo de Lorena"<lorena.acosta95@gmail.com>', // sender address
        to: user.email, // list of receivers
        subject: "Reserva COnfirmada 👻", // Subject line
        html: `<h1>Te esperamos ${user.name}</h1><br>
    <h4>This is great!</h4>`
    };

    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);

    callback(info);
}

// main().catch(console.error);