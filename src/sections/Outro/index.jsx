import content from "../../content";
import cn from "./Outro.module.scss";
import Button from "../../components/Button";

function Outro() {
  return (
    <div className={cn.wrapper}>
      <h2 dangerouslySetInnerHTML={{ __html: content.outro.title }} />
      <div className={cn.content}>
        {content.outro.content.map((item, index) => (
          <div key={index}>
            <h3>{item.title}</h3>
            <p dangerouslySetInnerHTML={{ __html: item.content }} />
            <Button to={item.link} label={item.btnText} />
          </div>
        ))}
      </div>
      <h4 className={cn.sub}>{content.outro.sub}</h4>
      <div className={cn.logoWrapper}>
        {content.outro.logos.map((item, index) => (
          <img key={index} src={item.src} alt={item.alt} />
        ))}
      </div>
    </div>
  );
}

export default Outro;
