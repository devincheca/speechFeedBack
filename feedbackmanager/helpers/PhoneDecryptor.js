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
      const dbItem = await this.getItemFromDB();
      if (!dbItem) {
        return '';
      }
      this.phoneNumber = this.res.Item.phoneNumber.S;
      /*
      const decipher = crypto.createDecipheriv(algorithm, this.res.Item.key.B, this.res.Item.iv.B);
      let decrypted = decipher.update(this.encryptedNumber, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      this.phoneNumber = decrypted;
      decrypted = null;
      */
      return this.phoneNumber;
    }
    catch(error) { console.trace(error); }
  }
  async getItemFromDB() {
    try {
      const params = {
        Key: {
          'tm-anon-links_id': { S: this.encryptedNumber },
        },
        TableName: 'tm-anon-links'
      };
      this.res = await dynamodb.getItem(params).promise();
      return this.res;
    }
    catch(error) { console.trace(error); }
  }
}

module.exports = PhoneDecryptor;
