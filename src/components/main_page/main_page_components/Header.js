import "./Header.css";

function Header() {
  return (
    <section id="header" className="fade-in">
      <div className="primary-container glass">
        <div id="portrait-container">
          <div id="portrait-background" className="glass"></div>
          <div id="portrait-upper"></div>
          <div id="portrait-lower"></div>
        </div>
        <h1>Hiroki Matsuuchi</h1>
        <h2>
          Building web applications with the power of{" "}
          <span className="bold-text purple-text">Django</span>, from{" "}
          <span className="bold-text purple-text">front-end</span> to{" "}
          <span className="bold-text purple-text">back-end</span>
        </h2>
        <p>
          As an experienced full-stack developer, I take pride in crafting
          high-quality, responsive web applications. With a deep understanding
          of both frontend and backend technologies, I am able to design and
          develop web applications that are fast, efficient, and user-friendly.
        </p>
      </div>
    </section>
  );
}

export default Header;
