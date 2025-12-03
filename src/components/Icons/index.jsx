import SmartCityIcon from "../../icons/SmartCity.svg";
import SmartCityIconMobile from "../../icons/SmartCityMobile.svg";
import NeueTechnologienIcon from "../../icons/NeueTechnologien.svg";
import NeueTechnologienIconMobile from "../../icons/NeueTechnologienMobile.svg";
import BildungIcon from "../../icons/Bildung.svg";
import BildungIconMobile from "../../icons/BildungMobile.svg";
import KulturIcon from "../../icons/Kultur.svg";
import KulturIconMobile from "../../icons/KulturMobile.svg";
import ProtoypingIcon from "../../icons/Prototyping.svg";
import ProtoypingIconMobile from "../../icons/PrototypingMobile.svg";
import WeiteresIcon from "../../icons/Weiteres.svg";
import WeiteresIconMobile from "../../icons/WeiteresMobile.svg";
import cn from "./Icons.module.scss";
import React, { useState, useEffect } from "react";

function Icons({ type }) {
  const [resizeCount, setResizeCount] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setResizeCount(prev => prev + 1);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (window.innerWidth <= 768)
    return (
      <div className={cn.iconWrapper}>
        {type === "smartCity" && <SmartCityIconMobile />}
        {type === "neueTechnologien" && <NeueTechnologienIconMobile />}
        {type === "bildung" && <BildungIconMobile />}
        {type === "kultur" && <KulturIconMobile />}
        {type === "prototyping" && <ProtoypingIconMobile />}
        {type === "weitereAktivitaeten" && <WeiteresIconMobile />}
      </div>
    );
  return (
    <div className={cn.iconWrapper}>
      {type === "smartCity" && <SmartCityIcon />}
      {type === "neueTechnologien" && <NeueTechnologienIcon />}
      {type === "bildung" && <BildungIcon />}
      {type === "kultur" && <KulturIcon />}
      {type === "prototyping" && <ProtoypingIcon />}
      {type === "weitereAktivitaeten" && <WeiteresIcon />}
    </div>
  );
}

export default Icons;
