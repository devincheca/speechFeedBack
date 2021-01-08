const faunadb = require('faunadb'),
  q = faunadb.query
const client = new faunadb.Client({ secret: process.env.FAUNA_SECRET })
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
        crypto.randomFill(new Uint8Array(16), async (err, iv) => {
          if (err) throw err;
          const cipher = crypto.createCipheriv(algorithm, key, iv);
          let encrypted = cipher.update(this.phoneNumber, 'utf8', 'hex');
          encrypted += cipher.final('hex');
          const params = {
            Item: {
              'tm-anon-links_id': encrypted,
              'key': key,
              'iv': Buffer.from(iv),
              'phoneNumber': encrypted,
              'timeStamp': (Math.floor(Date.now() / 1000) + (24*60*60)).toString()
            },
            TableName: 'tm-anon-links'
          };
          const createP = await client.query(
            q.Create(
              q.Collection(params.TableName),
              { data: params.Item }
            )
          );
          this.callback(encrypted);
          this.encryptedNumber = encrypted;
        });
      });
    }
    catch(error) { console.trace(error); }
  }
}

module.exports = PhoneEncryptor;
