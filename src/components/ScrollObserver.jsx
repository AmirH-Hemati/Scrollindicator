import { useEffect, useRef, useState } from "react";
import { faker } from "@faker-js/faker";
function ScrollObserver() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let itemsMap = document.querySelectorAll(".item-map");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            if (index == 0) {
              setProgress(0);
            } else {
              setProgress((index + 1) * 0.5);
              console.log(index);
            }
          }
        });
      },
      { threshold: 1 }
    );
    itemsMap.forEach((itemMap) => {
      observer.observe(itemMap);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div>
      <div className="scroll-conteiner">
        <h2>scroll with observer</h2>
        <div style={{ width: `${progress}%` }} className="progress-bar-observer"></div>
      </div>
      <div className="scroll-content">
        <div className="scrollright">
          {Array(200)
            .fill("")
            .map((item, index) => {
              return (
                <div className="item-map" key={index} data-index={index}>
                  {" "}
                  {index}{" "}
                </div>
              );
            })}
        </div>
        <div>{faker.lorem.paragraphs(700)}</div>
      </div>
    </div>
  );
}

export default ScrollObserver;
