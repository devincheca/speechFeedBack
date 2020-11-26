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
  }
  decryptNumber() {
    const key = crypto.scryptSync(password, 'salt', 24);
    // The IV is usually passed along with the ciphertext.
    const iv = Buffer.alloc(16, 0); // Initialization vector.
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    // Encrypted using same algorithm, key and iv.
    const encrypted = this.encryptedNumber;
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    this.phoneNumber = decrypted;
  }
}
module.exports = PhoneDecryptor;
