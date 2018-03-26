'use strict';
const util = require('util');
const request = util.promisify(require('request').defaults({jar: true}));

const gmail = async (email) => {
  const res = await request({
    method: "POST",
    url: "https://accounts.google.com/InputValidator?resource=SignUp&service=mail",
    json: {
      "input01": {
        "Input": "GmailAddress",
        "GmailAddress": email.split('@')[0],
        "FirstName": "",
        "LastName": ""
      },
      "Locale": "en"

    }
  });
  return Promise.resolve(
    res.body.input01.Valid === 'true'
    ? false
    : true);
}

module.exports = gmail;
