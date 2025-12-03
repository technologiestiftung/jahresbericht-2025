import { useRef, useState } from "react";
import Arrow from "../../icons/Arrow.svg";
import cn from "./SingleAccordion.module.scss";

function SingleAccordion({ content, title = "Vorwort lesen" }) {
  const clickEl = useRef();
  const panelEl = useRef();
  const [isOpen, setOpen] = useState(false);

  const clickHandler = () => {
    if (!isOpen) {
      const topPosition =
        clickEl.current.getBoundingClientRect().top + window.scrollY;
      const offset = window.innerWidth <= 768 ? window.innerHeight * 0.1 : 400;
      window.setTimeout(
        () =>
          window.scrollTo({
            top: topPosition - offset,
            behavior: "smooth",
          }),
        400
      );
    }
    setOpen(!isOpen);
  };

  return (
    <div className={cn.accordion} id={`accordion-${Math.random()}`}>
      <div
        className={cn.clickable}
        role='button'
        tabIndex={0}
        onClick={e => clickHandler(e)}
        onKeyDown={event => {
          if (event.key === "Enter" || event.key === " ") {
            clickHandler(event);
          }
        }}
        ref={clickEl}
      >
        <p className={cn.title}>{title}</p>
        <div className={isOpen ? cn.turned : ""}>
          <Arrow />
        </div>
      </div>
      <div
        className={cn.panel}
        style={
          isOpen ? { maxHeight: "none" } : { maxHeight: "0px", padding: "0px" }
        }
      >
        <div ref={panelEl} className={cn.paragraph}>
          <p
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default SingleAccordion;
