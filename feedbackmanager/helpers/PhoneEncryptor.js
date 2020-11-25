const AWS = require('aws-sdk');
AWS.config.update({region:'us-east-1'});
const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

const crypto = require('crypto');
const algorithm = 'aes-192-cbc';
const password = '6826691700';

class PhoneEncryptor {
  constructor() {
    this.callback = (encryptedNumber) => { return encryptedNumber; };
    this.encryptedNumber = '';
    this.phoneNumber = '';
  }
  async encryptNumber() {
    try {
      crypto.scrypt(password, 'salt', 24, (err, key) => {
        if (err) throw err;
        crypto.randomFill(new Uint8Array(16), (err, iv) => {
          if (err) throw err;
          const cipher = crypto.createCipheriv(algorithm, key, iv);
          let encrypted = cipher.update(this.phoneNumber, 'utf8', 'hex');
          encrypted += cipher.final('hex');
          const params = {
            Item: {
              'key': { S: key },
              'iv': { S: iv },
              'phoneNumber': { S: encrypted }
            },
            TableName: 'tm-anon-links'
          };
          await dynamodb.putItem(params).promise();
          this.callback(encrypted);
          this.encryptedNumber = encrypted;
        });
      });
    }
    catch(error) { console.trace(error); }
  }
}

module.exports = PhoneEncryptor;
