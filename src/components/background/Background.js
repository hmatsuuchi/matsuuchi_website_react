import { useRef, useEffect } from "react";
import "./Background.css";

function Background() {
  const ref1 = useRef(null);
  const ref2 = useRef(null);

  const background = (
    <section id="background">
      <div id="background-gradient"></div>
      <div id="background-gradient-mask"></div>
      <div id="background-shapes-container">
        <div
          ref={ref1}
          id="background-shape-1"
          className="background-glass"></div>
        <div
          ref={ref2}
          id="background-shape-2"
          className="background-glass"></div>
      </div>
    </section>
  );

  useEffect(() => {
    // integerSign 1 = positive, 2 = negative, 3 = both
    function randomMotionGenerator(max, integerSign) {
      let output = Math.random() * max;

      if (integerSign == 2) {
        output *= -1;
      } else if (Math.random() < 0.5 && integerSign == 3) {
        output *= -1;
      }

      return Math.round(output);
    }

    const circleOneMotion = [
      {
        transform: "translate(0, 0)",
        easing: "cubic-bezier(0.42, 0.0, 0.58, 1.0)",
      },
      {
        transform: `translate(${randomMotionGenerator(
          4,
          3
        )}rem, ${randomMotionGenerator(4, 3)}rem)`,
        easing: "cubic-bezier(0.42, 0.0, 0.58, 1.0)",
      },
      {
        transform: `translate(${randomMotionGenerator(
          4,
          3
        )}rem, ${randomMotionGenerator(4, 3)}rem)`,
        easing: "cubic-bezier(0.42, 0.0, 0.58, 1.0)",
      },
      {
        transform: `translate(${randomMotionGenerator(
          4,
          3
        )}rem, ${randomMotionGenerator(4, 3)}rem)`,
        easing: "cubic-bezier(0.42, 0.0, 0.58, 1.0)",
      },
      {
        transform: `translate(${randomMotionGenerator(
          4,
          3
        )}rem, ${randomMotionGenerator(4, 3)}rem)`,
        easing: "cubic-bezier(0.42, 0.0, 0.58, 1.0)",
      },
      {
        transform: `translate(${randomMotionGenerator(
          4,
          3
        )}rem, ${randomMotionGenerator(4, 3)}rem)`,
        easing: "cubic-bezier(0.42, 0.0, 0.58, 1.0)",
      },
      {
        transform: `translate(${randomMotionGenerator(
          4,
          3
        )}rem, ${randomMotionGenerator(4, 3)}rem)`,
        easing: "cubic-bezier(0.42, 0.0, 0.58, 1.0)",
      },
      {
        transform: `translate(${randomMotionGenerator(
          4,
          3
        )}rem, ${randomMotionGenerator(4, 3)}rem)`,
        easing: "cubic-bezier(0.42, 0.0, 0.58, 1.0)",
      },
      {
        transform: `translate(${randomMotionGenerator(
          4,
          3
        )}rem, ${randomMotionGenerator(4, 3)}rem)`,
        easing: "cubic-bezier(0.42, 0.0, 0.58, 1.0)",
      },
      {
        transform: `translate( ${randomMotionGenerator(
          4,
          3
        )}rem, ${randomMotionGenerator(4, 3)}rem)`,
        easing: "cubic-bezier(0.42, 0.0, 0.58, 1.0)",
      },
      {
        transform: "translate(0, 0)",
        easing: "cubic-bezier(0.42, 0.0, 0.58, 1.0)",
      },
    ];

    const circleOneTiming = {
      duration: 100000,
      iterations: Infinity,
    };

    const circleTwoMotion = [
      {
        transform: "translate(0, 0)",
        easing: "cubic-bezier(0.42, 0.0, 0.58, 1.0)",
      },
      {
        transform: `translate(${randomMotionGenerator(
          4,
          3
        )}rem, ${randomMotionGenerator(4, 3)}rem)`,
        easing: "cubic-bezier(0.42, 0.0, 0.58, 1.0)",
      },
      {
        transform: `translate(${randomMotionGenerator(
          4,
          3
        )}rem, ${randomMotionGenerator(4, 3)}rem)`,
        easing: "cubic-bezier(0.42, 0.0, 0.58, 1.0)",
      },
      {
        transform: `translate(${randomMotionGenerator(
          4,
          3
        )}rem, ${randomMotionGenerator(4, 3)}rem)`,
        easing: "cubic-bezier(0.42, 0.0, 0.58, 1.0)",
      },
      {
        transform: `translate(${randomMotionGenerator(
          4,
          3
        )}rem, ${randomMotionGenerator(4, 3)}rem)`,
        easing: "cubic-bezier(0.42, 0.0, 0.58, 1.0)",
      },
      {
        transform: `translate(${randomMotionGenerator(
          4,
          3
        )}rem, ${randomMotionGenerator(4, 3)}rem)`,
        easing: "cubic-bezier(0.42, 0.0, 0.58, 1.0)",
      },
      {
        transform: `translate(${randomMotionGenerator(
          4,
          3
        )}rem, ${randomMotionGenerator(4, 3)}rem)`,
        easing: "cubic-bezier(0.42, 0.0, 0.58, 1.0)",
      },
      {
        transform: `translate(${randomMotionGenerator(
          4,
          3
        )}rem, ${randomMotionGenerator(4, 3)}rem)`,
        easing: "cubic-bezier(0.42, 0.0, 0.58, 1.0)",
      },
      {
        transform: `translate(${randomMotionGenerator(
          4,
          3
        )}rem, ${randomMotionGenerator(4, 3)}rem)`,
        easing: "cubic-bezier(0.42, 0.0, 0.58, 1.0)",
      },
      {
        transform: `translate( ${randomMotionGenerator(
          4,
          3
        )}rem, ${randomMotionGenerator(4, 3)}rem)`,
        easing: "cubic-bezier(0.42, 0.0, 0.58, 1.0)",
      },
      {
        transform: "translate(0, 0)",
        easing: "cubic-bezier(0.42, 0.0, 0.58, 1.0)",
      },
    ];

    const circleTwoTiming = {
      duration: 100000,
      iterations: Infinity,
      delay: randomMotionGenerator(10000, 2),
    };

    if (ref1.current != null) {
      ref1.current.animate(circleOneMotion, circleOneTiming);
    }
    if (ref2.current != null) {
      ref2.current.animate(circleTwoMotion, circleTwoTiming);
    }
  }, []);

  return background;
}

export default Background;
