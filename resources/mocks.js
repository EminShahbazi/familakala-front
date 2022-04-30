"use strict";

const mocks = {
    "/api/login/otp": async function (req, res) {
        const buffers = [];

        for await (const chunk of req) {
            buffers.push(chunk);
        }

        const data = Buffer.concat(buffers).toString();

        console.log(data); // 'Buy the milk'
        // console.log(JSON.parse(data).phone); // 'Buy the milk'
        res.end();

        res.writeHead(200).end();

        // const phone = req.body.name ?? null;
        // if (!phone || !phone.length === 11) {
        //     res.writeHead(400).end(
        //         JSON.stringify({
        //             phone: "باید 11 رقمی باشد",
        //         })
        //     );
        // }
        // res.writeHead(200).end();
    },
};

exports.mocks = mocks;
