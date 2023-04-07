import "./BackArrow.css";

function BackArrow({ arrowText }) {
  return (
    <div className="arrow-container">
      <div className="back-arrow"></div>
      <div>{arrowText}</div>
    </div>
  );
}

export default BackArrow;
