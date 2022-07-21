const v1 = require('uuid');

const AWS = require('aws-sdk');
AWS.config.update({region:'us-east-1'});
const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

// const crypto = require('crypto');
// const algorithm = 'aes-192-cbc';
// const password = '6826691700';

class PhoneEncryptor {
  constructor() {
    this.callback = (encryptedNumber) => { return encryptedNumber; };
    this.encryptedNumber = '';
    this.phoneNumber = '';
  }
  async encryptNumber() {
    const encrypted = v1();
    const params = {
      Item: {
        'tm-anon-links_id': { S: encrypted },
        'key': { B: encrypted },
        'iv': { B: Buffer.from(encrypted) },
        'phoneNumber': { S: this.phoneNumber },
        'timeStamp': { N: (Math.floor(Date.now() / 1000) + (24*60*60)).toString() }
      },
      TableName: 'tm-anon-links'
    };
    await dynamodb.putItem(params).promise();
    this.callback(encrypted);
    /*
    try {
      crypto.scrypt(password, 'salt', 24, (err, key) => {
        if (err) throw err;
        crypto.randomFill(new Uint8Array(16), async (err, iv) => {
          if (err) throw err;
          const cipher = crypto.createCipheriv(algorithm, key, iv);
          let encrypted = cipher.update(this.phoneNumber, 'utf8', 'hex');
          encrypted += cipher.final('hex');
          const params = {
            Item: {
              'tm-anon-links_id': { S: encrypted },
              'key': { B: key },
              'iv': { B: Buffer.from(iv) },
              'phoneNumber': { S: encrypted },
              'timeStamp': { N: (Math.floor(Date.now() / 1000) + (24*60*60)).toString() }
            },
            TableName: 'tm-anon-links'
          };
          await dynamodb.putItem(params).promise();
          this.callback(encrypted);
          encrypted = null;
        });
      });
    }
    catch(error) { console.trace(error); }
    */
  }
}

module.exports = PhoneEncryptor;
