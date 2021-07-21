const AWS = require('aws-sdk');
AWS.config.update({region:'us-east-1'});
const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

class VoteChecker {
  constructor() {
    this.link = '';
    this.originator = '';
  }

  async getVotes() {
    try {
      return await this.getItemFromDB();
    }
    catch(error) {
      console.trace(error);
      return 'Oops, Something went wrong.'
    }
  }
  async getItemFromDB() {
    try {
      const params = {
        Key: {
          'tm-anon-votes_dynamo_id': { S: this.link },
          'tm-anon-votes_originator': { S: this.originator },
        },
        TableName: 'tm-anon-votes'
      };
      this.res = await dynamodb.getItem(params).promise();
      return this.res;
    }
    catch(error) { console.trace(error); }
  }
}

module.exports = VoteChecker;
