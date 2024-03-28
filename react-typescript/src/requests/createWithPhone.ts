// Helpers
import { req } from '../helpers/req';

// Types
import { PhoneNumber } from '../types/PhoneNumber';

// Helpers
import { generateTimeStamp } from '../helpers/timeStamp';

// Constant
import { POST_ACTIONS, TABLE_NAMES } from '../constants';

export const createWithPhone = async (phone: PhoneNumber, Id: string) => {
  return req({
    data: {
      TableName: TABLE_NAMES.FEEDBACK_LINKS,
      Item: {
        Action: POST_ACTIONS.CREATE_WITH_PHONE,
        PhoneNumber: phone.areaCode + phone.firstThree + phone.lastFour,
        TimeStamp: generateTimeStamp(),
        Id,
      },
    },
  });
};
