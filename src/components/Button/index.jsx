import cn from "./Button.module.scss";
import Pointer from "../../icons/Pointer.svg";

function Button({ to, label = "Hier gehts lang..." }) {
  return (
    <a className={cn.btn} href={to} rel='noreferrer' target='_blank'>
      <div>
        <Pointer />
      </div>
      {/* <p>{label}</p> */}
      <p dangerouslySetInnerHTML={{ __html: label }} />
    </a>
  );
}

export default Button;
