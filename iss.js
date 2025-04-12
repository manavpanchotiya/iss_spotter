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

const fetchCoordsByIP = (ip, callback) => {
  needle.get(`http://ipwho.is/${ip}`, (error, response, body) => {
    
    if (error) {
      return callback(error, null);
    }

    if (!body.success) {
      const message = `Success status was ${body.success}. Server message says: ${body.message} when fetching for IP ${body.ip}`;
      callback(Error(message), null);
      return;
    }

    const latitude = body.latitude;
    const longitude = body.longitude;
    callback(null, {latitude, longitude});
  });
};

const fetchISSFlyOverTimes = (coords, callback) => {
  needle.get(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {

    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const passes = body.response;
    callback(null, passes);
    return;
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes  };
