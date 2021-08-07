const nodemailer = require("nodemailer");

require('dotenv').config()

const {adminGMVEmail} = require('../../config/index')
let sendEmail = async (payload)=>{
  let transporter = nodemailer.createTransport({
    // host: "smtp.gmail.email",
    // port: 587,
    // secure: false, // true for 465, false for other ports
    service: 'gmail', 
    auth: {
      user: process.env.AUTH_EMAIL, // generated ethereal user
      pass: process.env.AUTH_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Giang Minh Viet Website" <gmvmailer@gmail.com>', // sender address
    //to: "receiverEmail", // list of receivers
    to: ["vanict99@gmail.com",`${process.env.RECV_EMAIL}`],
    subject: "GVM website have new inquiry", // Subject line
    html: `
    <h2><b>Inquiry Information</b></h2>
    <div style="margin-left: 30px;">
    <p><b>Cutosmer Name:</b> ${payload.customer_name} <p>
    <p><b>Cutosmer Email:</b> ${payload.email} <p>
    <p><b>Cutosmer Phone</b>: ${payload.phone} <p>
    <p><b>Message:</b> ${payload.message} <p>
    <p><b>Product_id :</b> ${payload.product_id} <p>
    <p><b>Quantity:</b> ${payload.quantity} <p>
    </div>
    <div>
    <p>Giang Minh Viet - High quality products <a href="${process.env.SHOP_WEBSITE_URL}">Click Here</a></p>
    </div>
    `, // html body
  });
}

module.exports = {
    sendEmail
}