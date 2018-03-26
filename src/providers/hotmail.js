'use strict';

const querystring = require('querystring');
const util = require('util');
const request = util.promisify(require('request').defaults({jar: true}));


/// is not safe, need to be re-written.
function decode(str) {
  return decodeURIComponent(JSON.parse('"' + str + '"'));
}
const hotmail = async (email) => {
  const res = await request({
    headers: {
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:58.0) Gecko/20100101 Firefox/58.0'
    },
    method: "GET",
    url: "https://signup.live.com/"
  });
  const query = querystring.parse(res.request.uri.query);

  /// extract CSRF key /
  // required.
  const locator = '"apiCanary":'
  const canaryStart = res.body.indexOf(locator) + locator.length + 1;
  const canarySection = res.body.substring(canaryStart);
  const canaryEnd = canarySection.indexOf('"');
  const canary = decode(canarySection.substring(0, canaryEnd));
  //////////////////////////

  /// extract tcxt key /
  /*
    locator='"tcxt":'
    const tcxtStart=res.body.indexOf(locator)+locator.length+1;
    const tcxtSection=res.body.substring(tcxtStart);
    const tcxtEnd=tcxtSection.indexOf('"');
    const tcxt=decode(tcxtSection.substring(0,tcxtEnd));
    */
  //not required.
  const tcxt = ''
  //////////////////////////
  const url = `https://signup.live.com/API/CheckAvailableSigninNames?uaid=${query.uaid}&lic=${query.lic}`;

  const response = await request({
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      Referer: res.request.uri.href,
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:58.0) Gecko/20100101 Firefox/58.0',
      tcxt,
      'canary': canary,
      uaid: query.uaid,
      scid: 100118,
      hpgid: 'Signup_MemberNamePage_Client'
    },
    method: "POST",
    url,
    json: {
      hpgid: 'Signup_MemberNamePage_Client',
      "signInName": email,
      "uaid": query.uaid,
      "includeSuggestions": true,
      "uiflvr": 1001,
      "scid": 100118,
      "hpgid": "Signup_MemberNamePage_Client"
    }
  });
  return Promise.resolve(!response.body.isAvailable)

}

module.exports = hotmail;
