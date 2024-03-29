const AWS = require('aws-sdk');
AWS.config.update({region:'us-east-1'});
const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

class VoteSaver {
  constructor() {
    this.link = '';
    this.vote = '';
  }

  async save() {
    try {
      const res = await this.getItemFromDB();
      if (!res.Item) {
        return 'Oops, Something went wrong.'
      }
      const { Item } = res;
      const linkId = Item['tm-anon-votes_dynamo_id'];
      const originator = Item['tm-anon-votes_originator'];
      const votes = JSON.parse(Item.votes.S).concat([this.vote]);
      const params = {
        Item: {
          'tm-anon-votes_dynamo_id': linkId,
          'tm-anon-votes_originator': originator,
          'votes': { S: JSON.stringify(votes) },
          'timeStamp': Item.timeStamp,
          'isSaving': { BOOL: false }
        },
        TableName: 'tm-anon-votes'
      };
      await dynamodb.putItem(params).promise();
      return true;
    }
    catch(error) {
      console.trace(error);
      return false;
    }
  }
  async getItemFromDB() {
    try {
      const id = this.link;
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

module.exports = VoteSaver;
