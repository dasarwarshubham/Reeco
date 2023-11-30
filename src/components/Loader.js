import Spinner from "react-bootstrap/Spinner";

const Loader = () => {
  const Styles = {
    width: "100%",
    minHeight: "88vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <div style={Styles}>
      <Spinner animation="border" variant="primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loader;
