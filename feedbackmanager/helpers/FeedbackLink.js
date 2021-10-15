const AWS = require('aws-sdk');
AWS.config.update({region:'us-east-1'});
const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

const v4 = require('uuid');

class FeedbackLink {
  constructor() {}

  async getNewVotingLink() {
    try {
      const linkId = v4();
      const originator = v4();
      const params = {
        Item: {
          'tm-anon-links_id': { S: linkId },
          'tm-anon-links_originator': originator,
          'phoneNumber': { S: linkId },
          'timeStamp': { N: (Math.floor(Date.now() / 1000) + (24*60*60)).toString() }
        },
        TableName: 'tm-anon-links'
      };
      await dynamodb.putItem(params).promise();
      return { linkId, originator };
    }
    catch(error) {
      console.trace(error);
      return 'Oops, Something went wrong.'
    }
  }
}

module.exports = FeedbackLink;
