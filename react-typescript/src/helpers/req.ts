export interface reqParams {
  data: object;
  endpoint: string;
}

export async function req({ data, endpoint }: reqParams) {
  const response = await fetch('https://api.ti-manager.com' + endpoint, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  });
  return response.json();
}