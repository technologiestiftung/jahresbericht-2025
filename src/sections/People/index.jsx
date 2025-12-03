import cn from "./People.module.scss";
import content from "../../content";
import Button from "../../components/Button";
import Person from "../../components/Person";

function People() {
  return (
    <section className={cn.wrapper}>
      <h2 dangerouslySetInnerHTML={{ __html: content.people.title }} />
      <h3 dangerouslySetInnerHTML={{ __html: content.people.subtitle }} />
      {content.people.content.map((item, index) => (
        <span key={item.id}>
          <Person item={item} align index={index} />
        </span>
      ))}
      {content.people.link && (
        <div className={cn.btnWrapper}>
          <Button to={content.people.link} label={content.people.btnText} />
        </div>
      )}
    </section>
  );
}

export default People;
