const { PhoneEncryptor } = require('../helpers/helpers');

exports.handler = async (event, context) => {
  const encryptor = new PhoneEncryptor();
  console.log(Object.keys(event));
  console.log(Object.keys(event.body));
  console.log(JSON.parse(event.body).phoneNumber);
  console.log(Object.keys(context));
  encryptor.phoneNumber = event.body.phoneNumber;
  encryptor.callback = (encryptedNumber) => {
    return {
      statusCode: 200,
      body: JSON.stringify({ token: encryptedNumber }),
    };
  };
  encryptor.encryptNumber();
};
