import { RefObject } from 'react';

export const copyToClipboard = (inputRef: RefObject<HTMLInputElement>) => {
  let isFailedCopy = false;
  let copyStatus;

  try { copyStatus = copy(inputRef); }
  catch(error) { isFailedCopy = true; }

  return { isFailedCopy, copyStatus };
};

const copy = (inputRef: RefObject<HTMLInputElement>) => {
  const inputText = inputRef.current && inputRef.current.value;
  const textarea = document.createElement("textarea");

  textarea.textContent = inputText;
  textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in Microsoft Edge.
  document.body.appendChild(textarea);
  textarea.select();

  try {
    return document.execCommand("copy");  // Security exception may be thrown by some browsers.
  } catch (ex) {
    console.warn("Copy to clipboard failed.", ex);
    return false;
  } finally {
    document.body.removeChild(textarea);
  }
}
