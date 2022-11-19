import "./App.css";
import "./styles.css";
import ResultTableComponent from "./components/ResultTableComponent";

function App() {
  return (
    <div className="App">
      <h1>Upload your file so Conan will help detect</h1>
      <h2>Only upload plain txt file please</h2>
      <ResultTableComponent/>
    </div>
  );
}

export default App;
