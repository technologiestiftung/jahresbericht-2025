import content from "../../content";
import cn from "./Footer.module.scss";

function Footer() {
  return (
    <>
      <div className={cn.wrapper}>
        <div className={cn.logos}>
          {content.footer.icons.map((item, index) => (
            <a key={index} href={item.link} rel='noreferrer' target='_blank'>
              <img src={item.src} alt={item.alt} />
            </a>
          ))}
        </div>
      </div>
      <div className={cn.last}>
        <div>
          <p className={cn.paragrah}>{content.footer.title}</p>
          <div>
            {content.footer.links.map((item, index) => (
              <a key={index} href={item.link} rel='noreferrer' target='_blank'>
                <p className={cn.paragrah}>{item.text}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
