import Icons from "../../components/Icons";
import cn from "./Main.module.scss";

function MainSection({ content }) {
  const { title, text, id } = content;
  return (
    <section className={cn.wrapper} id={id}>
      <div className={cn.content}>
        <div>{!!id && <Icons type={id} />}</div>
        <div>
          <h2 className={cn.title}>{title}</h2>
          <p
            className={cn.subTitle}
            dangerouslySetInnerHTML={{ __html: text }}
          />
        </div>
      </div>
    </section>
  );
}

export default MainSection;
