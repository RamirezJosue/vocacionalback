const nodemailer = require('nodemailer');
const juice = require('juice');
const htmlToText  = require('html-to-text');
const { promisify  } = require('util')
const pug = require('pug');

const generateHTML = (file, options = {}) => {
    const html = pug.renderFile(`${__dirname}/../views/emails/${file}.pug`, options)
    return juice(html);
}


const transport = nodemailer.createTransport({
    host: process.env.HOST_NODEMAILER,
    port: process.env.PORT_NODEMAILER,
    secure: false,
    auth: {
      user: process.env.USER, 
      pass: process.env.PASS 
    },
});

const sendEmail = async(options) => {
    const html = generateHTML(options.file, options);
    const text = htmlToText.fromString(html);
    let optionsEmail = await transport.sendMail({
        from: '"Vivasur" <no-replay@uptask.com>',
        to: options.email,
        subject: options.subject,
        text,
        html
    });
    const sendEmail = promisify(transport.sendMail, transport);
    return sendEmail.call(transport, optionsEmail);
}

module.exports = {
    sendEmail
}