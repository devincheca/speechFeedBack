const AWS = require('aws-sdk');
AWS.config.update({region:'us-east-1'});
const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

class FeedbackSaver {
  constructor() {
    this.token = '';
    this.vote = '';
  }

  async save() {
    try {
      const res = await this.getItemFromDB();
      if (!res.Item) {
        return 'Oops, Something went wrong.'
      }
      const { Item } = res;
      const linkId = Item['tm-anon-links_id'];
      const originator = Item['tm-anon-links_originator'];
      const feedback = JSON.parse(Item.feedback.S).concat([this.feedback]);
      const params = {
        Item: {
          'tm-anon-links_id': linkId,
          'tm-anon-links_originator': originator,
          'feedback': { S: JSON.stringify(feedback) },
          'timeStamp': Item.timeStamp,
          'isSaving': { BOOL: false }
        },
        TableName: 'tm-anon-links'
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
      const id = this.token;
      if (!id) {
        throw 'Invalid ID';
      }
      const params = {
        Key: {
          'tm-anon-links_id': { S: id },
        },
        TableName: 'tm-anon-links'
      };
      return await dynamodb.getItem(params).promise();
    }
    catch(error) {
      // console.trace(error);
      return {};
    }
  }
}

module.exports = FeedbackSaver;
