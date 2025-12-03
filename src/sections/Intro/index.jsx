import content from "../../content";
import cn from "./Intro.module.scss";
import ScrollDownIcon from "../../../src/icons/ScrollDown.svg";
import ScrollDownIconPNG from "../../../src/icons/ScrollDown.png";
import { useEffect } from "react";

function Intro() {
  const { headline, logo, header } = content.intro;

  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY;
      if (scroll > window.innerHeight / 5) {
        document.querySelector(`.${cn.scroll}`).classList.add(cn.scrolled);
      } else {
        document.querySelector(`.${cn.scroll}`).classList.remove(cn.scrolled);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className={cn.intro}>
      <div className={cn.content}>
        <div className={cn.logoAndHeadline}>
          <img className={cn.logo} src={logo.src} alt={logo.alt} />
          <h1
            className={cn.headline}
            dangerouslySetInnerHTML={{ __html: headline }}
          />
        </div>
        <div className={cn.headerImage}>
          <div>
            <img className={cn.header} src={header.src} alt={header.alt} />
            <div className={cn.scroll}>
              {/* <ScrollDownIcon /> */}
              <img
                src={ScrollDownIconPNG}
                alt='Ein Scroll Down Indikator Icon'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Intro;
