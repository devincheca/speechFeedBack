import QRCode from 'qrcode';

export interface reqParams {
  data: object;
  endpoint?: string;
};

const RESTUrl = 'https://api.ti-manager.com/ti-manager-lambda';

export async function req({ data, endpoint = '' }: reqParams) {
  const response = await fetch(RESTUrl + endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Origin': 'http://localhost:3000',
    },
    body: JSON.stringify(data)
  });
  return response.json();
}

export async function getVotesPoll({ queryString }: { queryString: string }) {
  const response = await fetch(`${RESTUrl}?${queryString}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Origin': 'http://localhost:3000',
    },
  });
  return response.json();
}

export async function getQrCode(canvas: HTMLCanvasElement, link: string) {
  QRCode.toDataURL(canvas, link);
};

/*
router.post('/voteQr/:link', async (req, res, next) => {
  QRCode.toDataURL(`https://ti-manager.com/castVote/${req.params.link}`, function (err, qrCode) {
    if (err) {
      console.trace(err);
      res.json({ err, qrCode: '' });
    }
    res.json({ qrCode });
  });
});
  const response = await fetch(`https://api.qr.io/v1/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Origin': 'http://localhost:3000',
    },
  });
  return response.json();
*/
