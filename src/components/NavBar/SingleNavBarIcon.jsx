import cx from "classnames";
import cn from "./NavBar.module.scss";
import { useState } from "react";

function SingleNavBarIcon({ icon, name, index, handleSingleNavBarIconClick }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      role='button'
      tabIndex={0}
      onClick={() => handleSingleNavBarIconClick(index)}
      onKeyDown={event => {
        if (event.key === "Enter" || event.key === " ") {
          handleSingleNavBarIconClick(index);
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {icon}
      {isHovered && window.innerWidth >= 768 && (
        <div className={cx(cn.speechBubble, cn.down)}>
          <p>{name}</p>
        </div>
      )}
    </div>
  );
}

export default SingleNavBarIcon;
