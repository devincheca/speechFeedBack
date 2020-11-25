const crypto = require('crypto');
const algorithm = 'aes-192-cbc';
const password = '6826691700';

class PhoneEncryptor {
  constructor() {
    this.callback = (encryptedNumber) => { return encryptedNumber; };
    this.encryptedNumber = '';
    this.phoneNumber = '';
  }
  encryptNumber() {
    try {
      crypto.scrypt(password, 'salt', 24, (err, key) => {
        if (err) throw err;
        crypto.randomFill(new Uint8Array(16), (err, iv) => {
          if (err) throw err;
          const cipher = crypto.createCipheriv(algorithm, key, iv);
          let encrypted = cipher.update(this.phoneNumber, 'utf8', 'hex');
          encrypted += cipher.final('hex');
          // save to DB here
          /*
          {
            key, iv, encrypted
          }
          */
          this.callback(encrypted);
          this.encryptedNumber = encrypted;
        });
      });
    }
    catch(error) { console.trace(error); }
  }
}

module.exports = PhoneEncryptor;
