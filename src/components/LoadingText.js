import "./LoadingText.css";

function LoadingText({ paragraphs, minLines }) {
  function loadingTextContent() {
    let output = [];

    var i;
    for (i = 0; i < paragraphs; i++) {
      var n;
      for (n = 0; n < minLines + Math.round(Math.random() * 3); n++) {
        output.push(
          <div
            key={`${i}-${n}`}
            className="placeholder-text shimmer"
            style={{ width: `${75 + Math.random() * 25}%` }}></div>
        );
      }

      if (i !== paragraphs - 1) {
        output.push(
          <div key={`${i}-${n}`} className="blank-placeholder-text"></div>
        );
      }
    }

    return output;
  }

  return (
    <div className="placeholder-text-container">
      {loadingTextContent(paragraphs, minLines)}
    </div>
  );
}

export default LoadingText;
