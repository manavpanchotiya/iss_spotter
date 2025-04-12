const needle = require('needle');

const fetchMyIP = (callback) => {
  const link = `https://geo.ipify.org/api/v2/country?apiKey=at_Rfl4bBT3sEPNY64HZcNCLvx6IHLhf`;
  needle.get(link, (error, response, body) => {
    if (error) {
      // Print the error if one occurred
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    if (!body || !body.ip) {
      return callback("IP Issue", null);
    } else {
      const ip = body.ip;
      callback(null, ip);
    }

  });
};

module.exports = { fetchMyIP };