import "./ForwardArrow.css";

function ForwardArrow({ arrowText }) {
  return (
    <div className="arrow-container">
      <div>{arrowText}</div>
      <div className="forward-arrow"></div>
    </div>
  );
}

export default ForwardArrow;
