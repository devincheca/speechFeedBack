const twilioSid = process.env.TWILIO_SID;
const twilioToken = process.env.TWILIO_TOKEN;
const client = require('twilio')(twilioSid, twilioToken);

class SmsMessanger {
  constructor() {
    this.feedback = '';
    this.phoneNumber = '';
    this.isSent = false;
  }
  async send() {
    const sentMessage = await client.messages
    .create({
      body: this.feedback,
      from: '+14243286206',
      to: '+1' + this.phoneNumber
    });
    if (!sentMessage.errorMessage) {
      this.isSent = true;
      return true;
    }
    this.isSent = false;
    return false;
  }
}

module.exports = SmsMessanger;
