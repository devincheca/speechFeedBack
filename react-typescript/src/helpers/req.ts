export interface reqParams {
  data: object;
  endpoint?: string;
};

const RESTUrl = 'https://api.ti-manager.com/ti-manager-lambda';

export async function req({ data, endpoint = '' }: reqParams) {
  const response = await fetch(RESTUrl + endpoint, {
    method: 'POST',
    // mode: 'cors',
    // cache: 'no-cache',
    // credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Origin': 'http://localhost:3000',
    },
    // redirect: 'follow',
    // referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  });
  return response.json();
}

export async function GET({ endpoint = '' }: reqParams) {
  const response = await fetch(RESTUrl + endpoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Origin': 'http://localhost:3000',
    },
  });
  return response.json();
}
