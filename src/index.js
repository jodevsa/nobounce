const process = require('process');
const Gmail=require('./providers/gmail');
const Hotmail=require('./providers/gmail');
const util = require('util');
const querystring = require('querystring');

const map = {
  "hotmail.com": Hotmail,
  "gmail.com": Gmail,
  "outlook.com": Hotmail
}

async function check(email) {
  [name, domain] = email.split('@');

  if (map[domain]) {
    return await map[domain](email);
  } else {
    return true;
  }

}

module.exports = check;
