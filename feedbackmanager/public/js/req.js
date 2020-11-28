async function req(params) {
  const response = await fetch(window.localStorage.domain + params.endpoint, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(params.data)
  });
  return response.json();
}
