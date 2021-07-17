const AWS = require('aws-sdk');
AWS.config.update({region:'us-east-1'});
const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

const v4 = require('uuid');

class VoteLink {
  constructor() {}

  async getNewVotingLink() {
    try {
      const linkId = v4();
      const params = {
        Item: {
          'tm-anon-votes_id': { S: linkId },
          'timeStamp': { N: (Math.floor(Date.now() / 1000) + (24*60*60)).toString() }
        },
        TableName: 'tm-anon-votes'
      };
      await dynamodb.putItem(params).promise();
      return linkId;
    }
    catch(error) {
      console.trace(error);
      return 'Oops, Something went wrong.'
    }
  }
}

module.exports = VoteLink;
