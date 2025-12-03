import cn from "./Vorwort.module.scss";
import content from "../../content";
import Person from "../../components/Person";

function Vorwort() {
  return (
    <section className={cn.wrapper}>
      <h2 dangerouslySetInnerHTML={{ __html: content.vorwort.title }} />
      {content.vorwort.people.map((item, index) => (
        <span key={index}>
          <Person item={item} index={index} accordion />
        </span>
      ))}
    </section>
  );
}

export default Vorwort;
