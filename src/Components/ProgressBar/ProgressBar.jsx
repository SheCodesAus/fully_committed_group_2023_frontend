const ProgressBar = (props) => {
  const { bgcolor, completed } = props;
  const containerStyles = {
    height: 25,
    width: "60%",
    backgroundColor: "#87978D",
    borderRadius: 50,
    margin: 20,
  };
  const fillerStyles = {
    height: "100%",
    width: `${completed}%`,
    backgroundColor: bgcolor,
    borderRadius: "inherit",
    textAlign: "right",
  };
  const labelStyles = {
    padding: 5,
    color: "white",
    fontWeight: "bold",
    fontSize: ".75rem",
    // verticalAlign: ''
  };
  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${completed}%`}</span>
      </div>
    </div>
  );
};
export default ProgressBar;
