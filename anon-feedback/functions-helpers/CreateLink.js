const { PhoneEncryptor } = require('../helpers/helpers');

exports.handler = async (event, context) => {
  const encryptor = new PhoneEncryptor();
  encryptor.phoneNumber = req.body.phoneNumber;
  encryptor.callback = (encryptedNumber) => {
    return {
      statusCode: 200,
      body: JSON.stringify({ token: encryptedNumber }),
    };
  };
  encryptor.encryptNumber();
};
