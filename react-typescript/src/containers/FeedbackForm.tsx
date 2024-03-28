import React, { useRef, useState } from 'react';

// Helpers
import { req } from '../helpers/req';

// Components
import { LoadingButton } from '../components';

// Constant
import { POST_ACTIONS, TABLE_NAMES } from '../constants';

export const FeedbackForm = (props: { inboundFeedbackLink: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  const feedbackInput = useRef<HTMLTextAreaElement>(null)

  const sendFeedback = async () => {
    setIsLoading(true);
    await req({
      data: {
        TableName: TABLE_NAMES.FEEDBACK_LINKS,
        Item: {
          Action: POST_ACTIONS.SEND_FEEDBACK_TO_PHONE,
          Id: props.inboundFeedbackLink,
          Feedback: feedbackInput.current && feedbackInput.current.value,
        },
      },
    });
    setIsLoading(false);
  };

  return <>
    <div className="inputPhoneHeader">To send your anonymous feedback input your feedback below:</div>
    <div>
      <div className="form-group">
        <textarea className="form-control" rows={5} ref={feedbackInput} autoFocus></textarea>
      </div>
      <div className="form-group text-right">
        <button type="button" className="btn btn-primary" onClick={() => sendFeedback()}>Send Feedback</button>
        { isLoading && <LoadingButton /> }
      </div>
    </div>
  </>;
};
