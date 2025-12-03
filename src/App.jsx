import cn from "./App.module.scss";
import NavBar from "./components/NavBar";
import Slider from "./components/Slider";
import content from "./content";
import Footer from "./sections/Footer";
import Intro from "./sections/Intro";
import Main from "./sections/Main";
import Outro from "./sections/Outro";
import People from "./sections/People";
import Sticky from "./sections/Sticky";
import Vorwort from "./sections/Vorwort";

function App() {
  return (
    <div className={cn.app}>
      <NavBar />
      <Intro />
      <Main content={content.offenheit} />
      <Vorwort />
      <Slider />
      <div id='chapters'>
        {content.chapters.map(chapter => (
          <span key={chapter.id}>
            <Main content={chapter} />
            <Sticky
              content={chapter.projects}
              title={chapter.title}
              id={chapter.id}
            />
          </span>
        ))}
      </div>
      <People />
      <Outro />
      <Footer />
    </div>
  );
}

export default App;
