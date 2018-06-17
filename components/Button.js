export default ({
  text = 'props.text',
  btnStyle = 'primary',
  left,
  action = () => {},
}) => (
  <button
    className={`btn btn-${btnStyle}`}
    style={left ? {} : { marginLeft: '20px' }}
    onClick={() => action()}
  >
    {text}
  </button>
);
