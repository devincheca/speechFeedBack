const AWS = require('aws-sdk');
AWS.config.update({region:'us-east-1'});
const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

class LinkChecker {
  constructor() {
    this.token = '';
    this.isValid = false;
  }
  async checkToken() {
    this.isSent = true;
  }
}

module.exports = LinkChecker;
