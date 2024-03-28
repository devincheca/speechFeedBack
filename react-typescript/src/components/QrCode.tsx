export const QrCode = (props: { qrCodeImageUrl: string }) => {
  const { qrCodeImageUrl } = props;

  return <div className="form-group text-center">
    <div>For hybrid meetings:</div>
    <img alt="QR Code" src={qrCodeImageUrl} />
  </div>
};
