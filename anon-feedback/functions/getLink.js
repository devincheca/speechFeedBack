const helpers = require('../functions-helpers/functions-helpers.js');
exports.handler = async (event) => {
  if (event.httpMethod === 'POST') {
    return await helpers.CreateLink.handler(event);
  }
};
