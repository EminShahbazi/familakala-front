const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const port = 3001;

app.use(bodyparser.json());

app.post("/login/otp", (req, res) => {
    const phone = req.body.phone;

    if (!phone || phone.length !== 11) {
        return res
            .status(400)
            .send({ phone: "شماره همراه باید 11 رقمی باشد." });
    }
    res.status(200).end();
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
