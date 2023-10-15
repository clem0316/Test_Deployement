import Navbar from "./components/Navbar";
import Cards from "./components/Cards";
import Intro from "./components/Intro";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div>
        <Intro />
      </div>
      <div>
        <Cards />
      </div>
    </div>
  );
}

export default App;
