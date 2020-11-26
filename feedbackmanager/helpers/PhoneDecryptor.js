const AWS = require('aws-sdk');
AWS.config.update({region:'us-east-1'});
const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

const crypto = require('crypto');
const algorithm = 'aes-192-cbc';
const password = '6826691700';

class PhoneDecryptor {
  constructor() {
    this.phoneNumber = '';
    this.encryptedNumber = '';
    this.res = {};
  }
  async decryptNumber() {
    try {
      console.log(this.res);
      // const iv = new Uint8Array(res.iv);
      // const iv = Buffer.alloc(16, 0); // Initialization vector.
      const decipher = crypto.createDecipheriv(algorithm, res.key, res.iv);
      // Encrypted using same algorithm, key and iv.
      let decrypted = decipher.update(this.encryptedNumber, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      this.phoneNumber = decrypted;
      return this.phoneNumber;
    }
    catch(error) { console.trace(error); }
  }
  async getItemFromDB() {
    const params = {
      Key: {
        'tm-anon-links_id': { S: this.encryptedNumber },
      },
      TableName: 'tm-anon-links'
    };
    this.res = await dynamodb.getItem(params).promise();
  }
}
module.exports = PhoneDecryptor;
