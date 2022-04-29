import React, { useState, useRef } from 'react';

export interface PhoneNumber {
  areaCode: string;
  firstThree: string;
  lastFour: string;
};

export interface PhoneNumberInputPropTypes {
  focusNext: (phoneNumber: PhoneNumber) => void;
  isNumberHidden: boolean;
};

export default function PhoneNumberInput(props: PhoneNumberInputPropTypes) {
  const { focusNext, isNumberHidden } = props;

  const [areaCode, setAreaCode] = useState('');
  const [firstThree, setFirstThree] = useState('');
  const [lastFour, setLastFour] = useState('')

  const firstThreeRef = useRef<HTMLInputElement>(null);
  const lastFourRef = useRef<HTMLInputElement>(null);

  const nextFocus = (placement: string, digits: string) => {
    if (placement === 'areaCode' && digits.length === 3) return firstThreeRef && firstThreeRef.current && firstThreeRef.current.focus();
    if (placement === 'firstThree' && digits.length === 3) return lastFourRef && lastFourRef.current && lastFourRef.current.focus();
    if (placement === 'lastFour' && digits.length === 4) return focusNext && focusNext({ areaCode, firstThree, lastFour });
  };

  return (
    <>
        <div className="form-group phone-input-div text-center">
          <span>1(</span>
          <input
            type={isNumberHidden ? "password" : "number"}
            className="form-control text-center"
            placeholder="999"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setAreaCode(event.target.value); nextFocus('areaCode', event.target.value); }}
          />
          <span>)</span>
          <input
            ref={firstThreeRef}
            type={isNumberHidden ? "password" : "number"}
            className="form-control text-center"
            placeholder="999"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setFirstThree(event.target.value); nextFocus('firstThree', event.target.value); }}
          />
          <span>-</span>
          <input
            ref={lastFourRef}
            type={isNumberHidden ? "password" : "number"}
            className="form-control text-center"
            placeholder="9999"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setLastFour(event.target.value); nextFocus('lastFour', event.target.value); }}
          />
        </div>
    </>
  );
}
