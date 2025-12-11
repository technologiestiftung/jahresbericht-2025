import { useCallback, useEffect, useRef, useState } from "react";
import content from "../../content";
import BildungIcon from "../../icons/BildungNav.svg";
import KulturIcon from "../../icons/KulturNav.svg";
import NeueTechnologienIcon from "../../icons/NeueTechnologienNav.svg";
import PrototypingIcon from "../../icons/PrototypingNav.svg";
import SmartCityIcon from "../../icons/SmartCityNav.svg";
import UpIcon from "../../icons/Up.svg";
import WeiteresIcon from "../../icons/WeiteresNav.svg";
import cn from "./NavBar.module.scss";
import SingleNavBarIcon from "./SingleNavBarIcon";

function NavBar() {
  const scrollThreshold = true;
  const trackScrolling = useRef(true);
  const iconWidth = window.innerWidth >= 768 ? 56 : 48;
  const [showNav, setShowNav] = useState(false);
  const ids = content.chapters.flatMap(chapter => [
    chapter.id,
    `${chapter.id}-sticky`,
  ]);
  const sections = ids.map(id => document.getElementById(id));
  const [indicator, setIndicator] = useState("");
  const icons = [
    { name: "Smart City", id: "smartCity", icon: <SmartCityIcon /> },
    {
      name: "Neue Technologien",
      id: "neueTechnologien",
      icon: <NeueTechnologienIcon />,
    },
    {
      name: "Wissenschaft & Bildung",
      icon: <BildungIcon />,
    },
    {
      name: "Kultur",
      icon: <KulturIcon />,
    },
    {
      name: "Prototyping",
      icon: <PrototypingIcon />,
    },
    {
      name: "Weiteres",
      id: "weitereAktivitaeten",
      icon: <WeiteresIcon />,
    },
  ];

  const handleSingleNavBarIconClick = downIndex => {
    if (!icons[downIndex]) return;
    const getID =
      icons[downIndex].id ||
      icons[downIndex].name.toLowerCase().replace(" ", "-");
    const section = document.getElementById(getID);
    if (!section) return;
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleUpIconClick = () =>
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  const setLeft = () => {
    if (indicator === "smartCity" || !indicator) return 0;
    if (indicator === "neueTechnologien") return iconWidth;
    if (indicator === "bildung") return iconWidth * 2;
    if (indicator === "kultur") return iconWidth * 3;
    if (indicator === "prototyping") return iconWidth * 4;
    if (indicator === "weitereAktivitaeten") return iconWidth * 5;
    return 0;
  };

  const handleScroll = useCallback(() => {
    function checkCurrentSection() {
      if (scrollThreshold) {
        let newCurrentSection = null;
        sections.forEach(section => {
          if (section) {
            const rect = section.getBoundingClientRect();
            if (
              rect.top <= window.innerHeight / 2 &&
              rect.bottom >= window.innerHeight / 2
            ) {
              newCurrentSection = section.id;
            }
          }
        });
        if (newCurrentSection) {
          const getID = newCurrentSection.replace("-sticky", "");
          if (indicator !== getID) {
            setIndicator(getID);
          }
        }
      } else {
        const scrollPosition = window.scrollY + window.innerHeight / 2; // Middle of the viewport
        let currentSection = null;
        sections.forEach(section => {
          if (section) {
            const rect = section.getBoundingClientRect();
            const sectionTop = window.scrollY + rect.top;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (
              scrollPosition >= sectionTop &&
              scrollPosition < sectionBottom
            ) {
              currentSection = section.id;
            }
          }
        });
        if (currentSection) {
          const getID = currentSection.replace("-sticky", "");
          if (indicator !== getID) {
            setIndicator(getID);
          }
        }
      }
    }
    // console.log("handleScroll", trackScrolling.current);
    if (!trackScrolling.current) return;
    checkCurrentSection();
    const chaptersContent = document
      .getElementById("chapters")
      .getBoundingClientRect();
    const position = window.scrollY;
    const getScrollPosition =
      chaptersContent.top + window.scrollY + window.innerHeight * 0.666666666;
    const getEndPosition =
      chaptersContent.top +
      window.scrollY +
      chaptersContent.height -
      window.innerHeight;
    if (
      position >= getScrollPosition &&
      position <= getEndPosition &&
      !showNav
    ) {
      setShowNav(true);
    }
    if (
      (position < getScrollPosition || position > getEndPosition) &&
      showNav
    ) {
      setShowNav(false);
    }
  }, [showNav, indicator, sections, scrollThreshold]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div
      className={cn.wrapper}
      style={
        showNav
          ? {}
          : window.innerWidth < 768
            ? { transform: `translateY(calc(25px + 100%)) translateX(-50%)` }
            : { transform: `translateY(calc(41px + 100%)) translateX(-50%)` }
      }
    >
      <div
        className={cn.indicator}
        style={{
          left: setLeft(),
        }}
      />
      <div className={cn.main}>
        {icons.map((icon, index) => (
          <SingleNavBarIcon
            key={index}
            index={index}
            icon={icon.icon}
            name={icon.name}
            handleSingleNavBarIconClick={val => {
              if (icons[val]) {
                trackScrolling.current = false;
                const getID =
                  icons[val].id ||
                  icons[val].name.toLowerCase().replace(" ", "-");
                setIndicator(getID);
                setTimeout(() => {
                  trackScrolling.current = true;
                }, 1000);
              }
              handleSingleNavBarIconClick(val);
            }}
          />
        ))}
      </div>
      <div
        role='button'
        tabIndex={0}
        className={cn.jump}
        onClick={() => handleUpIconClick()}
        onKeyDown={event => {
          if (event.key === "Enter" || event.key === " ") {
            handleUpIconClick();
          }
        }}
      >
        <UpIcon />
      </div>
    </div>
  );
}

export default NavBar;
