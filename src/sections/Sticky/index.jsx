import { useEffect, useRef, useState } from "react";
import Button from "../../components/Button";
import cn from "./Sticky.module.scss";

function Sticky({ content, title, id }) {
  const sectionRef = useRef(null);
  const firstContainerRef = useRef(null);
  const secondContainerRef = useRef(null);
  const thirdContainerRef = useRef(null);
  const fourthContainerRef = useRef(null);
  const [visible, setVisible] = useState("first");
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1280
  );

  const RenderIMG = () => {
    const setIndex =
      visible === "first"
        ? 0
        : visible === "second"
          ? 1
          : visible === "third"
            ? 2
            : 3;

    if (windowWidth < 1280) {
      return (
        <div
          className={cn.bg}
          style={{
            backgroundImage: `url('${content[setIndex].img.mobileSrc || content[setIndex].img.src}')`,
          }}
        />
      );
    }

    return (
      <div className={cn.bg}>
        <img alt={content[setIndex].img.alt} src={content[setIndex].img.src} />
        {content[setIndex].img.copyright && (
          <div className={cn.copyright}>
            <p>{content[setIndex].img.copyright}</p>
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!content || content?.length === 1) return;
      const first = firstContainerRef?.current?.getBoundingClientRect();
      const second = secondContainerRef?.current?.getBoundingClientRect();
      const third = thirdContainerRef?.current?.getBoundingClientRect();
      const fourth = fourthContainerRef?.current?.getBoundingClientRect();

      if (first?.bottom >= 0) return setVisible("first");
      if (first?.bottom < 0 && second.top >= 0) return setVisible("second");
      if (second?.bottom < 0 && third?.top >= 0) return setVisible("third");
      if (fourth && third?.bottom < 0) return setVisible("fourth");
    };

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Add event listeners
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    // Initial calls
    handleScroll();
    handleResize();

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [content]);

  if (!content) return null;

  return (
    <section className={cn.wrapper} ref={sectionRef} id={`${id}-sticky`}>
      <RenderIMG />
      <div className={cn.content}>
        {content.map((current, index) => (
          <div
            key={current.id}
            style={{ marginBottom: index + 1 === content.length ? 0 : "100vh" }}
          >
            <div
              className={cn.container}
              ref={
                !index
                  ? firstContainerRef
                  : index === 1
                    ? secondContainerRef
                    : index === 2
                      ? thirdContainerRef
                      : fourthContainerRef
              }
            >
              <p className={cn.sub}>{title}</p>
              <h3 dangerouslySetInnerHTML={{ __html: current.title }} />
              <p
                dangerouslySetInnerHTML={{ __html: current.paragraph }}
                className={cn.paragraph}
              />
              {!!current.link && (
                <Button to={current.link} label='Zur Webseite' />
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Sticky;
