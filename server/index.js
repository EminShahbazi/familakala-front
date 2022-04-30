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

app.post("/login/otp-verify", (req, res) => {
    const { phone, code } = req.body;

    if (code !== "12345") {
        return res.status(400).send({ code: "کد وارد شده اشتباه است." });
    }

    return res.status(200).end();
});

app.post("/login/password", (req, res) => {
    const { phone, password } = req.body;

    if (phone !== "09351082211" || password !== "123456") {
        return res
            .status(400)
            .send("شماره همراه و یا رمز عبور به درستی وارد نشده است.");
    }

    return res.status(200).end();
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
