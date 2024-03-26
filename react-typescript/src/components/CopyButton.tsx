export const CopyButton = (props: {
  copy: () => void,
  copyStatus: string
}) => {
  const { copy, copyStatus } = props;

  return <div
    className="form-group"
    style={{ display: 'flex', justifyContent: 'space-between', width: '15vw' }}>
    <button type="button" className="btn btn-primary" onClick={copy}>
      <span style={{ fontSize: '.875em', marginRight: '.125em', position: 'relative', top: '-.25em', left: '-.125em' }}>
        📄<span style={{ position: 'absolute', top: '.25em', left: '.25em' }}>📄</span>
      </span>
    </button>
    { copyStatus === 'Copied' && <span className="text-primary">Copied!</span> }
    { copyStatus === 'Failed' && <span className="text-danger">Copy Failed</span> }
  </div>
};
