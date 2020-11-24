// get twilio stuff here

class SmsMessanger {
  constructor() {
    this.phoneNumber = '';
    this.isSent = false;
  }
  async send() {
    this.isSent = true;
  }
}

module.exports = SmsMessanger;
