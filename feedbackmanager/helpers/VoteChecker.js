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
      const res = await this.getItemFromDB();
      if (!res.Item) {
        return 'Oops, Something went wrong.'
      }
      return res.Item['tm-anon-votes_originator'].S === this.originator ? res.Item.votes.S : {};
    }
    catch(error) {
      console.trace(error);
      return 'Oops, Something went wrong.'
    }
  }
  async getItemFromDB() {
    try {
      const [ id ] = this.link.split('/').reverse();
      if (!id) {
        throw 'Invalid ID';
      }
      const params = {
        Key: {
          'tm-anon-votes_dynamo_id': { S: id },
        },
        TableName: 'tm-anon-votes'
      };
      return await dynamodb.getItem(params).promise();
    }
    catch(error) {
      // console.trace(error);
      return {};
    }
  }
}

module.exports = VoteChecker;
